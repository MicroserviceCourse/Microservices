package org.example.orderservice.Enum;

public enum PaymentStatus {
    PENDING, //Chờ thanh toán(chưa hoàn tất)
    PAID,    //Đã thanh toán thành công
    FAILED,  //Giao dịch thất bại
    CANCELLED,  // Bị huỷ (do người dùng hoặc hệ thống)
    REFUNDED,   //Đã hoàn tiền
    EXPIRED,    //Qúa hạn thanh toán
}
