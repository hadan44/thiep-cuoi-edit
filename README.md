# Công cụ viết tên thiệp cưới

Mở `Thiep-cuoi.html` hoặc `index.html` bằng Chrome/Edge. Không cần cài đặt hay kết nối mạng.

- Nhập tên khách, chỉnh cỡ chữ, màu và căn trái/giữa/phải.
- Chọn từng khối chữ để thay đổi kích thước 60–140% bằng thanh kéo hoặc nhập số.
- Xuất PNG ở độ phân giải gốc, đặt tên tệp theo khách mời.
- Bấm **Lưu thông số ra file .txt** để tải bản sao lưu.
- Lần sau bấm **Đọc thông số từ file .txt** và chọn bản đã lưu để khôi phục.
- Trình duyệt tự nhớ chỉnh sửa nếu cho phép localStorage. File .txt là bản sao lưu dùng được khi chuyển trình duyệt hoặc chuyển máy.

File thông số chứa tên khách và toàn bộ tùy chỉnh, có định dạng JSON dễ đọc trong tệp `.txt`. Ứng dụng không tự ghi đè file trên máy; khi muốn cập nhật bản sao lưu, bấm lưu lại.

## Phát triển

Chỉnh `index.template.html`, sau đó chạy `node build.cjs` để tạo hai tệp HTML độc lập có ảnh được nhúng sẵn. Không cần thư viện ngoài.

Chữ có sẵn trong PNG được phóng theo từng vùng ảnh; kích thước quá lớn có thể làm mờ chữ hoặc chạm vùng khác.
