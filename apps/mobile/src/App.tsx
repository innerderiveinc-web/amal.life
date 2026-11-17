import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

// Canonical URLs
const OFFLINE_EMBEDDED_URL = 'file:///android_asset/web/index.html';
const DEFAULT_LOCAL_DEV_URL = 'http://192.168.1.8:3005';

// Client-side script injected into Android WebView to ensure robust offline routing & storage
const INJECTED_OFFLINE_SHIELD = `
  (function() {
    // 1. In-memory storage fallback if file:/// protocol restricts localStorage
    try {
      var _probe = '__probe__';
      window.localStorage.setItem(_probe, _probe);
      window.localStorage.removeItem(_probe);
    } catch (e) {
      console.warn('[AMAL Hybrid] localStorage sandboxed. Installing memory fallback.');
      var _memStore = {};
      try {
        Object.defineProperty(window, 'localStorage', {
          value: {
            getItem: function(k) { return _memStore[k] || null; },
            setItem: function(k, v) { _memStore[k] = String(v); },
            removeItem: function(k) { delete _memStore[k]; },
            clear: function() { _memStore = {}; },
            get length() { return Object.keys(_memStore).length; },
            key: function(i) { return Object.keys(_memStore)[i] || null; }
          },
          writable: true,
          configurable: true
        });
      } catch (err) {}
    }

    // 2. Intercept root-relative links in file:/// mode to route to android_asset/web/...
    if (window.location.protocol === 'file:') {
      document.addEventListener('click', function(e) {
        var el = e.target;
        while (el && el.tagName !== 'A') {
          el = el.parentElement;
        }
        if (el && el.getAttribute) {
          var href = el.getAttribute('href');
          if (href && href.startsWith('/') && !href.startsWith('//')) {
            e.preventDefault();
            var path = href.replace(/^\\/+/, '').replace(/\\/+$/, '');
            var target = path ? 'file:///android_asset/web/' + path + '/index.html' : 'file:///android_asset/web/index.html';
            window.location.href = target;
          }
        }
      }, true);
    }
  })();
  true;
`;

export const App: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [targetUrl, setTargetUrl] = useState(OFFLINE_EMBEDDED_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState(DEFAULT_LOCAL_DEV_URL);

  // 1. Android Hardware Back Button Handler
  useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true; // handled
      }
      return false; // let Android handle (exit app if at root)
    };

    const backSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backSubscription.remove();
  }, [canGoBack]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleReload = () => {
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleSwitchToOffline = () => {
    setHasError(false);
    setTargetUrl(OFFLINE_EMBEDDED_URL);
    setIsUrlModalOpen(false);
  };

  const handleSwitchToCustomUrl = () => {
    if (!inputUrl.trim()) return;
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('file://')) {
      url = 'http://' + url;
    }
    setHasError(false);
    setTargetUrl(url);
    setIsUrlModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#064E3B" />

      {/* COMPACT DIGNIFIED BRAND HEADER & CONTROLS */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {canGoBack && (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => webViewRef.current?.goBack()}
              accessibilityLabel="Back"
            >
              <Text style={styles.headerBtnText}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.logoText}>AMAL OS</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {targetUrl.startsWith('file://') ? '📱 Offline OS' : '🌐 Live Dev'}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={handleReload}
            accessibilityLabel="Reload"
          >
            <Text style={styles.headerActionIcon}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => setIsUrlModalOpen(true)}
            accessibilityLabel="Network Switcher"
          >
            <Text style={styles.headerActionIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* WEBVIEW CONTAINER */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: targetUrl }}
          style={styles.webview}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onLoadEnd={() => setIsLoading(false)}
          injectedJavaScriptBeforeContentLoaded={INJECTED_OFFLINE_SHIELD}
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            if (url.startsWith('file:///android_asset/web/')) {
              return true;
            }
            if (url.startsWith('file:///')) {
              const subPath = url.replace('file:///', '').replace(/^\/+/, '');
              const cleanPath = subPath.replace(/\/index\.html$/, '').replace(/\/$/, '');
              const newTarget = cleanPath ? `file:///android_asset/web/${cleanPath}/index.html` : 'file:///android_asset/web/index.html';
              setTargetUrl(newTarget);
              return false;
            }
            return true;
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            setHasError(true);
            setErrorMessage(nativeEvent.description || 'Connection failed');
            setIsLoading(false);
          }}
          // Enhanced Hybrid Native Android Settings
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={['*']}
          mixedContentMode="always"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          cacheEnabled={true}
          cacheMode="LOAD_DEFAULT"
          scalesPageToFit={true}
          bounces={false}
          overScrollMode="never"
        />

        {/* LOADING INDICATOR */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.loadingText}>AMAL OS لوڈ ہو رہا ہے...</Text>
          </View>
        )}

        {/* ERROR RECOVERY SHIELD */}
        {hasError && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorBismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
            <Text style={styles.errorTitle}>AMAL OS — رابطہ منقطع ہوا</Text>
            <Text style={styles.errorSub}>
              {targetUrl.startsWith('file://')
                ? 'مقامی فائل لوڈ کرنے میں عارضی مسئلہ آیا ہے۔'
                : `سرور (${targetUrl}) سے رابطہ نہیں ہو سکا۔`}
            </Text>
            <Text style={styles.errorDesc}>{errorMessage}</Text>

            <View style={styles.errorActions}>
              <TouchableOpacity style={styles.retryBtn} onPress={handleReload}>
                <Text style={styles.retryBtnText}>🔄 دوبارہ کوشش کریں (Retry)</Text>
              </TouchableOpacity>

              {!targetUrl.startsWith('file://') && (
                <TouchableOpacity
                  style={styles.offlineBtn}
                  onPress={handleSwitchToOffline}
                >
                  <Text style={styles.offlineBtnText}>📱 آف لائن موڈ چلائیں (Switch to Offline)</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>

      {/* NETWORK / TARGET SWITCHER MODAL */}
      <Modal
        visible={isUrlModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUrlModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>AMAL OS کنکشن مینیجر</Text>
            <Text style={styles.modalSub}>
              ٹیسٹنگ اور مکمل فیڈ بیک کے لیے منتخب فرمائیں کہ ایپ کہاں سے چلے:
            </Text>

            {/* OPTION 1: EMBEDDED OFFLINE OS */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                targetUrl.startsWith('file://') && styles.optionCardActive,
              ]}
              onPress={handleSwitchToOffline}
            >
              <Text style={styles.optionIcon}>📱</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>مکمل آف لائن امبلڈڈ OS (Recommended)</Text>
                <Text style={styles.optionDesc}>
                  تمام 31 اسکرینیں، 106 کتب، اور 548 صفحات کا مصحف براہِ راست APK کے اندر سے لوڈ ہوگا۔ انٹرنیٹ کی ضرورت نہیں۔
                </Text>
              </View>
            </TouchableOpacity>

            {/* OPTION 2: LIVE WI-FI DEV SERVER */}
            <View style={styles.customUrlSection}>
              <Text style={styles.customUrlLabel}>یا اپنے لیپ ٹاپ / سرور سے لائیو جوڑیں:</Text>
              <TextInput
                style={styles.urlInput}
                value={inputUrl}
                onChangeText={setInputUrl}
                placeholder="http://192.168.1.8:3005"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.connectBtn}
                onPress={handleSwitchToCustomUrl}
              >
                <Text style={styles.connectBtnText}>لائیو سرور سے جوڑیں (Connect)</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setIsUrlModalOpen(false)}
            >
              <Text style={styles.closeModalBtnText}>بند کریں (Close)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#064E3B',
  },
  header: {
    height: 48,
    backgroundColor: '#064E3B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBtn: {
    padding: 6,
    marginRight: 4,
  },
  headerBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    color: '#FDE68A',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  badgeText: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerActionBtn: {
    padding: 6,
  },
  headerActionIcon: {
    fontSize: 16,
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#022C22',
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#022C22',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#022C22',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#A7F3D0',
    fontSize: 14,
    fontWeight: '700',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#022C22',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBismillah: {
    fontSize: 16,
    color: '#86EFAC',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F87171',
    marginBottom: 6,
  },
  errorSub: {
    fontSize: 13,
    color: '#E2E8F0',
    textAlign: 'center',
    marginBottom: 6,
  },
  errorDesc: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorActions: {
    width: '100%',
    gap: 10,
  },
  retryBtn: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  offlineBtn: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  offlineBtnText: {
    color: '#E2E8F0',
    fontWeight: '700',
    fontSize: 13,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'right',
  },
  modalSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 16,
    textAlign: 'right',
    lineHeight: 18,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  optionCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#064E3B',
  },
  optionIcon: {
    fontSize: 28,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
  },
  customUrlSection: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  customUrlLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  urlInput: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 13,
    marginBottom: 10,
  },
  connectBtn: {
    backgroundColor: '#059669',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  closeModalBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeModalBtnText: {
    color: '#94A3B8',
    fontWeight: '700',
    fontSize: 14,
  },
});
