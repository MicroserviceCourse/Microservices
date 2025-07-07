package org.example.banner_service.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/banner/all",
            "/api/banner/danh-sach",
            "/api/blog/all",
            "/api/new/all"


    };
    public static final String[] URL_ADMIN_POST = {
            "/api/banner/create",
            "/api/blog/create",
            "/api/new/create",
    };
    public static final String[] URL_ADMIN_PUT = {
            "/api/banner/update/{id}",
            "/api/blog/update/{id}",
            "/api/new/update/{id}",
    };
    public static final String[] URL_ADMIN_DELETE = {
            "/api/banner/delete/{id}",
            "/api/blog/delete/{id}",
            "/api/new/delete/{id}",
    };

}
