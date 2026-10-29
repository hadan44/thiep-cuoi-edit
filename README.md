# Công cụ viết tên thiệp cưới

Chạy `Chay-thiep-cuoi.cmd` để mở giao diện có tự động đọc và ghi file `thong-so-thiep-cuoi.txt` trong cùng thư mục. Giữ cửa sổ khởi động mở khi sử dụng. Cần Node.js (trên máy hiện tại có sẵn). Có thể chạy thủ công: `node server.cjs 4173 --open`.

Mỗi khi mở, phần mềm ưu tiên thông số trong file `.txt`. Thay đổi tự lưu sau khoảng 250 ms; có nút **Lưu ngay vào file .txt**. Nếu chưa có file, phần mềm tạo từ `default-settings.json`. File lỗi sẽ được giữ nguyên, không tự ghi đè. File thông số cá nhân được loại khỏi Git.

Vẫn có thể mở `Thiep-cuoi.html` trực tiếp để dùng offline, nhưng chế độ đó chỉ tự nhớ trong trình duyệt và lưu/đọc file thủ công.

- Nhập tên khách, chỉnh cỡ chữ, màu và căn trái/giữa/phải.
- Chọn từng khối chữ để thay đổi kích thước 60–140% bằng thanh kéo hoặc nhập số.
- Xuất PNG ở độ phân giải gốc, đặt tên tệp theo khách mời.
- Bấm **Lưu thông số ra file .txt** để tải bản sao lưu.
- Lần sau bấm **Đọc thông số từ file .txt** và chọn bản đã lưu để khôi phục.
- Trình duyệt tự nhớ chỉnh sửa nếu cho phép localStorage. File .txt là bản sao lưu dùng được khi chuyển trình duyệt hoặc chuyển máy.

File thông số chứa tên khách và toàn bộ tùy chỉnh, có định dạng JSON dễ đọc trong tệp `.txt`. Chế độ chạy bằng `.cmd` tự ghi đè thông số vào file cố định này; chế độ mở HTML trực tiếp cần bấm lưu lại để tải bản sao lưu.

## Phát triển

Chỉnh `index.template.html`, sau đó chạy `node build.cjs` để tạo hai tệp HTML độc lập có ảnh được nhúng sẵn. Không cần thư viện ngoài.

Chạy `node test.cjs` để kiểm tra đọc/ghi file, dữ liệu không hợp lệ và bảo toàn file bị lỗi. Kiểm tra chạy trên bản sao trong thư mục tạm.

Chữ có sẵn trong PNG được phóng theo từng vùng ảnh; kích thước quá lớn có thể làm mờ chữ hoặc chạm vùng khác.
