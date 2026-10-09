export declare const AmalTheme: {
    colors: {
        primary: string;
        primaryHover: string;
        primaryLight: string;
        primaryMuted: string;
        surface: {
            backgroundLight: string;
            cardLight: string;
            borderLight: string;
            backgroundDark: string;
            cardDark: string;
            borderDark: string;
        };
        text: {
            primaryLight: string;
            secondaryLight: string;
            tertiaryLight: string;
            primaryDark: string;
            secondaryDark: string;
            tertiaryDark: string;
        };
        accent: {
            terracotta: string;
            terracottaLight: string;
            sand: string;
            goldMuted: string;
        };
        status: {
            success: string;
            successLight: string;
            info: string;
            infoLight: string;
            warning: string;
            warningLight: string;
            neutralGray: string;
        };
    };
    typography: {
        fonts: {
            sans: string;
            serif: string;
            arabic: string;
            urdu: string;
        };
        sizes: {
            xs: number;
            sm: number;
            base: number;
            lg: number;
            xl: number;
            '2xl': number;
            '3xl': number;
            '4xl': number;
        };
        lineHeights: {
            tight: number;
            normal: number;
            relaxed: number;
            arabic: number;
        };
    };
    spacing: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        8: number;
        10: number;
        12: number;
    };
    radii: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
    };
    shadows: {
        subtle: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
        card: {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
    };
};
export declare function getThemePalette(isDark?: boolean): {
    background: string;
    card: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    primaryLight: string;
    accent: {
        terracotta: string;
        terracottaLight: string;
        sand: string;
        goldMuted: string;
    };
    status: {
        success: string;
        successLight: string;
        info: string;
        infoLight: string;
        warning: string;
        warningLight: string;
        neutralGray: string;
    };
};
//# sourceMappingURL=theme.d.ts.map