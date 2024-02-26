package io.github.m00nwtchr.flashmind

import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent

class MainActivity : TauriActivity() {
	fun openUrl(url: String) {
		val builder = CustomTabsIntent.Builder()
		val customTabsIntent = builder.build()
		customTabsIntent.launchUrl(this, Uri.parse(url))
	}
}
