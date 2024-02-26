#[cfg(target_os = "android")]
mod jni;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn open_url(url: String, window: tauri::Window) {
	#[cfg(target_os = "android")]
	window
		.webviews()
		.first()
		.expect("Webview")
		.with_webview(|pw| open_url::open_url(url, pw))
		.expect("with webview");

	#[cfg(not(target_os = "android"))]
	open_url::open_url(url);
}

mod open_url {
	use tauri::webview::PlatformWebview;

	#[cfg(not(target_os = "android"))]
	pub fn open_url(url: String) {}

	#[cfg(target_os = "android")]
	pub fn open_url(url: String, pw: PlatformWebview) {
		use crate::jni::java_exception;
		use jni::objects::JValueGen;

		pw.jni_handle().exec(|env, activity, _webview| {
			let url = env.new_string(url).unwrap();

			env.call_method(
				activity,
				"openUrl",
				"(Ljava/lang/String;)V",
				&[JValueGen::Object(&url)],
			)
			.map_err(|err| java_exception(err, env))
			.expect("Launch Url");
		})
	}
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_http::init())
		.plugin(tauri_plugin_deep_link::init())
		.plugin(tauri_plugin_os::init())
		.plugin(tauri_plugin_shell::init())
		.invoke_handler(tauri::generate_handler![open_url])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
