package org.example.product_service.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/category/all",
            "/api/product/all",
    };
    public static final String[] URL_ADMIN_POST = {
            "/api/category/create",
            "/api/product/create",


    };
    public static final String[] URL_ADMIN_PUT = {
            "/api/category/update/{id}",
            "/api/product/update/{id}",
    };
    public static final String[] URL_ADMIN_DELETE = {
            "/api/category/delete/{id}",
            "/api/product/delete/{id}",
    };
}
