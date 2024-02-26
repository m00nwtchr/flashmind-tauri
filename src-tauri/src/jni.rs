use anyhow::anyhow;
use jni::{objects::JString, JNIEnv};

pub fn java_exception(err: jni::errors::Error, env: &mut JNIEnv) -> anyhow::Error {
	match err {
		jni::errors::Error::JavaException => {
			let exception = env.exception_occurred().unwrap();
			env.exception_describe().unwrap();
			// eprintln!("Errrr");

			let str: JString = env
				.call_method(exception, "getMessage", "()Ljava/lang/String;", &[])
				.unwrap()
				.l()
				.unwrap()
				.into();

			let message = env.get_string(&str).unwrap();
			anyhow!("{}", message.to_str().unwrap())
		}
		_ => anyhow!("{err}"),
	}
}
