package org.example.banner_service.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/banner/all",
            "/api/banner/danh-sach"
    };
    public static final String[] URL_ADMIN_POST = {
            "/api/banner/create"
    };
    public static final String[] URL_ADMIN_PUT = {
            "/api/banner/update/{id}",
    };

}
