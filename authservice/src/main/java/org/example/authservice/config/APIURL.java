package org.example.authservice.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/account/users",
            "/api/account/role",
    };
    public static final String[] URL_ANONYMOUS_POST = {
            "/api/account/login",
            "/api/account/register",
            "/api/account/refresh-token"
    };
    public static final String[] URL_ANONYMOUS_PUT = {

    };
    public static final String[] URL_ANONYMOUS_DELETE = {

    };

    public static final String[] URL_USER_GET = {
            "/login/oauth2/code/google",
            "/login/oauth2/**",
            "/login",
            "/login/**"
    };

    public static final String[] URL_USER_POST = {
            "/api/account/forgot-password/**",
            "/api/account/reset-password/**",
            "/api/account/verify-account"
    };

    public static final String[] URL_USER_PUT = {
            "/api/user/update/**",

    };
}
