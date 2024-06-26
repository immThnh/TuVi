function validateForm() {
  var hodem = $("#hodem").val();
  var ten = $("#ten").val();
  var inputNgay = parseInt($("#ngay").val());
  var inputThang = parseInt($("#thang").val());
  var inputNam = parseInt($("#nam").val());
  var tentacy = $("#tentacy").val();

  // Xóa thông báo lỗi cũ
  $(".error-message").empty();

  var nameRegex = /^[a-zA-ZÀ-ỸỳỹỷỵẢẨẤẪẮẬảấầẩẫắậÃẴẲẮẶãẵẳắặÈÉẺẼẸỀẾỆỄỆỂèéẻẽẹềếệễểÌÍỈỊỊỊỊỈÒÓỎÕỌỒỐỔỖỘồốổỗộÙÚỦŨỤỪỨỬỮỰùúủũụừứửữựỳýỷỹỵ ]+$/
  // Kiểm tra hodem và ten
  if (!nameRegex.test(hodem)) {
    $("#error-hodem").text("Họ đệm phải là ký tự chữ cái.");
  }

  if (!nameRegex.test(ten)) {
    $("#error-ten").text("Tên phải là ký tự chữ cái.");
  }

  // Kiểm tra ngày, tháng, năm hợp lệ
  if (isNaN(inputNgay) || isNaN(inputThang) || isNaN(inputNam)) {
    $("#error-sinhnhat").text("Ngày, tháng, năm phải là số.");
  } else {
    // Kiểm tra ngày tháng năm có hợp lệ hay không
    if (inputThang < 1 || inputThang > 12) {
      $("#error-sinhnhat").text("Tháng không hợp lệ.");
    } else {
      var daysInMonth = new Date(inputNam, inputThang, 0).getDate();
      if (inputNgay < 1 || inputNgay > daysInMonth) {
        $("#error-sinhnhat").text(
          "Ngày không tồn tại."
        );
      }
    }
  }

  // Kiểm tra tên tắc y nếu có giá trị
  if (tentacy.trim() !== "") {
    if (!nameRegex.test(tentacy)) {
      $("#error-tentacy").text("Phải là ký tự chữ cái.");
    }
  }

   // Kiểm tra xem có lỗi không để tắt/mở nút "Submit"
   var hasErrors = $(".error-message").text().trim() !== "";
   $("#submitBtn").prop("disabled", hasErrors);
}
