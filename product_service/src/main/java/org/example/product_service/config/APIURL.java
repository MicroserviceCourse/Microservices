package org.example.product_service.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_GET = {
            "/api/category/all",
            "/api/product/all",
            "/api/product-variant/all",
            "/api/product-variant/{id}",
            "/api/tag/all",
            "/api/product/{id}",
            "/api/category/{id}",
            "/api/variant/all",
            "/api/variant/{id}",
            "/api/tag/{id}",
    };
    public static final String[] URL_ADMIN_POST = {
            "/api/category/create",
            "/api/product/create",
            "/api/product-variant/create",
            "/api/tag/create",
            "/api/variant/create",

    };
    public static final String[] URL_ADMIN_PUT = {
            "/api/category/update/{id}",
            "/api/product/update/{id}",
            "/api/product-variant/update/{id}",
            "/api/tag/update/{id}",
            "/api/variant/update/{id}",
    };
    public static final String[] URL_ADMIN_DELETE = {
            "/api/category/delete/{id}",
            "/api/product/delete/{id}",
            "/api/product-variant/delete/{id}",
            "/api/tag/delete/{id}",
            "/api/variant/delete/{id}",
            "/api/product-variant/delete/{id}",
    };
}
