import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { registerRootComponent } from 'expo';
import { App } from './src/App';

// Global JS fatal error catcher to prevent Android from throwing JavascriptException and crashing
if (typeof global !== 'undefined' && global.ErrorUtils) {
  const previousHandler = global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('AMAL OS Global Error Caught:', error, 'isFatal:', isFatal);
    if (previousHandler) {
      // In dev or logging environments, allow pass-through if not fatal
      try {
        previousHandler(error, false);
      } catch (e) {
        // swallow to protect against hard process kill
      }
    }
  });
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class RootErrorBoundary extends Component<{}, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AMAL OS RootErrorBoundary Caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.errorContainer}>
          <View style={styles.card}>
            <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
            <Text style={styles.errorTitle}>AMAL OS — بازیابی و تحفظ (Recovery)</Text>
            <Text style={styles.errorSubtitle}>
              ایپ میں ایک عارضی مسئلہ پیش آیا ہے، لیکن ڈیٹا محفوظ ہے۔
            </Text>

            <TouchableOpacity style={styles.restartBtn} onPress={this.handleRestart}>
              <Text style={styles.restartBtnText}>🔄 دوبارہ کوشش فرمائیں (Restart App)</Text>
            </TouchableOpacity>

            <ScrollView style={styles.errorDetailsScroll}>
              <Text style={styles.errorLabel}>تکنیکی تفصیلات (Diagnostic Log):</Text>
              <Text style={styles.errorMessage}>
                {this.state.error?.name}: {this.state.error?.message}
              </Text>
              {this.state.error?.stack && (
                <Text style={styles.errorStack}>{this.state.error.stack}</Text>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }

    return <App />;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#0F291E',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  bismillah: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B4332',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#991B1B',
    textAlign: 'center',
    marginBottom: 4,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  restartBtn: {
    backgroundColor: '#1B4332',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  restartBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  errorDetailsScroll: {
    maxHeight: 250,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  errorLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorStack: {
    fontSize: 10,
    color: '#334155',
    fontFamily: 'monospace',
    lineHeight: 14,
  },
});

registerRootComponent(RootErrorBoundary);
