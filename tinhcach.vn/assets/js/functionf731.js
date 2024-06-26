// obj chuyển đổi chữ thành số
const objectQuyDoiChu = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

//v2 Chuyển đổi để lấy nguyên âm, phụ âm trong tên.
function chuyenDoiNguyenAmVaPhuAm(arr) {
  const vowels = ["A", "E", "I", "O", "U"];
  let is_y_vowel = false;

  if (arr.length === 1 && arr[0] === "Y") {
    is_y_vowel = true;
  } else {
    if (arr[0] === "Y" && !vowels.includes(arr[1])) {
      is_y_vowel = true;
    } else if (
      arr[arr.length - 1] === "Y" &&
      !vowels.includes(arr[arr.length - 2])
    ) {
      is_y_vowel = true;
    } else {
      for (let i = 1; i < arr.length - 1; i++) {
        if (
          arr[i] === "Y" &&
          !vowels.includes(arr[i - 1]) &&
          !vowels.includes(arr[i + 1])
        ) {
          is_y_vowel = true;
          break;
        }
      }
    }
  }

  let regex;
  if (is_y_vowel) {
    regex = /[aeiouy]/i;
  } else {
    regex = /[aeiou]/i;
  }

  const nguyenAm = [];
  const phuAm = [];

  for (let i = 0; i < arr.length; i++) {
    if (regex.test(arr[i])) {
      nguyenAm.push(arr[i]);
    } else {
      phuAm.push(arr[i]);
    }
  }

  return { nguyenAm, phuAm };
}

// Chuyển đổi tất cả các mảng từ chữ cái trên thành số tương ứng -> cộng tổng chúng dần
function chuyenDoiChuThanhSoVaTinhTongArr(arr) {
  // Function giúp Cộng các số trong mảng lại với nhau
  function tongSoTuArr(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i].toUpperCase(); // convert to uppercase to match object keys
    const number = objectQuyDoiChu[char];
    if (number) {
      result.push(number);
    }
  }
  const sum = tongSoTuArr(result);
  return sum;
}

function lamTronSoVeDuoi9GiuSoBacThay(number) {
  // Case 1: number is from 1 to 9, keep it the same
  if (number >= 1 && number <= 9) {
    return number;
  }

  // Case 2: number is one of 10, 11, 20, 22, 30, or 33, keep it the same
  if ([10, 11, 20, 22, 30, 33].includes(number)) {
    return number;
  }

  // Case 3: add the digits together and keep adding if the sum is greater than 11
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  if (sum <= 11) {
    return sum;
  } else {
    return lamTronSoVeDuoi9GiuSoBacThay(sum);
  }
}

// Chuyển đổi chuỗi ngày tháng năm sinh thành 3 mảng ngày sinh, tháng sinh và năm sinh riêng biệt.
function chuyenDoiDateThanhArr(inputDate) {
  const dateArray = inputDate.split("-");
  // typedate yyyy-mm-dd
  var year = dateArray[0];
  var month = dateArray[1];
  var day = dateArray[2];
  // giữ lại số to trong ngày, tháng, năm (nếu tính cả năm 10,20,30 => vẫn cần giữ)
  var dayArray =
    day === "10" ||
    day === "11" ||
    day === "20" ||
    day === "22" ||
    day === "30" ||
    day === "33"
      ? [Number(day)]
      : day.split("").map(Number);
  var monthArray =
    month === "10" ||
    month === "11" ||
    month === "20" ||
    month === "22" ||
    month === "30" ||
    month === "33"
      ? [Number(month)]
      : month.split("").map(Number);
  var yearArr =
    year === "10" ||
    year === "11" ||
    year === "20" ||
    year === "22" ||
    year === "30" ||
    year === "33"
      ? [Number(year)]
      : year.split("").map(Number);
  function xoaSoKhong(arr) {
    if (arr.includes(0)) {
      return arr.filter((elem) => elem !== 0);
    }
    return arr;
  }
  return {
    day: xoaSoKhong(dayArray),
    month: xoaSoKhong(monthArray),
    year: xoaSoKhong(yearArr),
  };
}

function getDinhCuocDoi(number) {
  const dinhCuocDoiMap = {
    20: 2,
    30: 3,
    22: 4,
    33: 6,
    1: 10,
  };
  return dinhCuocDoiMap[number] || number;
}

function demSoTrongMang(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    if (obj[element]) {
      obj[element]++;
    } else {
      obj[element] = 1;
    }
  }
  // Thêm các khóa chưa xuất hiện trong object và đặt giá trị là 0
  var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 22, 30, 33];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!obj.hasOwnProperty(key)) {
      obj[key] = 0;
    }
  }
  var sortedArr = Object.entries(obj).sort(function (a, b) {
    return b[1] - a[1];
  });
  // lấy ra mảng 4 số
  var fourNumber = sortedArr.slice(0, 4);

  return [obj, fourNumber];
}

function getBangSo(obj, number) {
  var soLuong = obj[number];
  if (soLuong == 0) {
    return "";
  } else {
    return `${number}^${soLuong}`;
  }
}

// biến đổi đoạn string ban đầu vào, xử lí để loại tiếng việt, viết inhoa và tách thành mảng thông qua split space
function chuyenDoiTextThanhArr(inputString) {
  const unsignedString = inputString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/[ĂÂăâ]/g, "A") // Hằng, HẰNG, Hân, Hân
    .replace(/[Đđ]/g, "D") // Đại, ĐẠI
    .replace(/[Êê]/g, "E") // Tiến, TIẾN
    .replace(/[ÔƠôơ]/g, "O") // Hồng, Mơ,
    .replace(/[Ưư]/g, "U"); // Thư
  const processString = unsignedString.replace(/\s+/g, "").toUpperCase();
  const outputString = processString.split("");
  return outputString;
}

// chuyển đổi tên, họ thành chữ cái trong từng mảng
function getChuCaiToArr(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    var element = chuyenDoiTextThanhArr(arr[index]);
    newArr.push(element);
  }
  return newArr;
}

// Tìm kiếm nguyên âm và phụ âm trong họ và tên
function getChiaNguyenAmPhuAm(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    var element = chuyenDoiNguyenAmVaPhuAm(arr[index]);
    newArr.push(element);
  }
  return newArr;
}

// chuyển đổi số từ tên và họ đệm
function getChuyenDoiSoTenVaHoDem(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    var element = chuyenDoiChuThanhSoVaTinhTongArr(arr[index]);
    newArr.push(element);
  }
  return newArr;
}
// chuyển đổi số trong nguyên âm và phụ âm
function getChuyenDoiSoNguyenAmVaPhuAm(arr) {
  let newArrNguyenAm = [];
  let newArrPhuAm = [];
  for (let index = 0; index < arr.length; index++) {
    var element = arr[index];
    var nguyenAm = chuyenDoiChuThanhSoVaTinhTongArr(element["nguyenAm"]);
    var phuAm = chuyenDoiChuThanhSoVaTinhTongArr(element["phuAm"]);
    newArrNguyenAm.push(nguyenAm);
    newArrPhuAm.push(phuAm);
  }
  return { nguyenam: newArrNguyenAm, phuam: newArrPhuAm };
}

function tinhTongGiuSoBacThay(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    // console.log(arr[index]);
    var element = lamTronSoVeDuoi9GiuSoBacThay(arr[index]);
    newArr.push(element);
  }
  return newArr;
}

function tinhTongCacSoTuMangGiuSoBacThay(arr) {
  var sum = 0;
  for (let index = 0; index < arr.length; index++) {
    // console.log(arr[index]);
    var element = arr[index];
    sum = sum + element;
  }
  var result = lamTronSoVeDuoi9GiuSoBacThay(sum);
  return result;
}

function tinhTongCacSoTuMangKhongGiuSoBacThay(arr) {
  var sum = 0;
  for (let index = 0; index < arr.length; index++) {
    // console.log(arr[index]);
    var element = arr[index];
    sum = sum + element;
  }
  var result = lamTronSoVeDuoi9KhongGiuSoBacThay(sum);
  return result;
}

function tinhTuoiSinhNhat(dateOfBirth) {
  // Kiểm tra đầu vào
  if (!dateOfBirth) {
    return "Ngày sinh không hợp lệ";
  }

  // Chuyển đổi định dạng yyyy-mm-dd thành yyyy/mm/dd
  var formattedDateOfBirth = dateOfBirth.replace(/-/g, "https://tinhcach.vn/");

  // Tạo đối tượng Date cho ngày hiện tại
  var currentDate = new Date();

  // Tạo đối tượng Date cho ngày sinh từ chuỗi đầu vào (formattedDateOfBirth)
  var birthDate = new Date(formattedDateOfBirth);

  // Kiểm tra tính hợp lệ của đối tượng Date
  if (isNaN(birthDate.getTime())) {
    return "Ngày sinh không hợp lệ";
  }

  // Tính tuổi
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  var textAge = age + " Tuổi";
  return textAge;
}

// --------------- các hàm phục vụ tính nâng cao -------------

function lamTronSoVeDuoi9KhongGiuSoBacThay(number) {
  if (number <= 9) {
    return number;
  } else {
    let sum = 0;
    String(number)
      .split("")
      .forEach(function (digit) {
        sum = sum + Number(digit);
      });
    return lamTronSoVeDuoi9KhongGiuSoBacThay(sum);
  }
}

function chuyenDoiDateThanhArrKhongGiuSoBacThay(inputDate) {
  const dateArray = inputDate.split("-");
  // typedate yyyy-mm-dd
  var year = dateArray[0];
  var month = dateArray[1];
  var day = dateArray[2];
  // giữ lại số to trong ngày, tháng, năm (nếu tính cả năm 10,20,30 => vẫn cần giữ)
  var dayArray = day.split("").map(Number);
  var monthArray = month.split("").map(Number);
  var yearArr = year.split("").map(Number);
  function xoaSoKhong(arr) {
    if (arr.includes(0)) {
      return arr.filter((elem) => elem !== 0);
    }
    return arr;
  }
  return {
    day: xoaSoKhong(dayArray),
    month: xoaSoKhong(monthArray),
    year: xoaSoKhong(yearArr),
  };
}

function truHaiSoLayHieuDuong(num1, num2) {
  let result = num1 - num2;
  if (result < 0) {
    result = -result;
  }
  return result;
}

function chuyenDoiNumberThanhMang(number) {
  return String(number).split("").map(Number);
}

function timSoBiThieuTrongArr(arr) {
  const nums = new Set(arr);
  const missing = [];
  let count = 0;
  for (let i = 1; i <= 9; i++) {
    if (!nums.has(i)) {
      missing.push(i);
      count++;
    }
  }
  if (count > 0) {
    return { count, missing };
  } else {
    return { count: 0, missing: "Không" };
  }
}

function checkNoNghiep(arr) {
  let number = 0;
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    number += element;
  }
  if (number == 13) {
    return "Nợ nghiệp 13/4";
  } else if (number == 14) {
    return "Nợ nghiệp 14/5";
  } else if (number == 16) {
    return "Nợ nghiệp 16/7";
  } else if (number == 19) {
    return "Nợ nghiệp 19/1";
  } else {
    return "Không nợ nghiệp";
  }
}

function getChuCaiDauTienTrongHoTen(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    // var element = chuyenDoiNguyenAmVaPhuAm(arr[index]);
    var element = arr[index][0]; //lấy ký tự đầu tiên
    newArr.push(element);
  }
  return newArr;
}
function chuyenDoiChuThanhSo(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i].toUpperCase(); // convert to uppercase to match object keys
    const number = objectQuyDoiChu[char];
    if (number) {
      result.push(number);
    }
  }
  return result;
}

//------------------- call data in to modal
function getModal(id, number, responseData) {
  var html = "";
  if (!number) {
    html = "";
  } else {
    var dataObj = responseData[number];
    html +=
      "<b>Tổng quan về số: </b>" +
      number +
      "<br>" +
      "<b>3 Gốc: </b>" +
      dataObj["bagoc"] +
      "<br>" +
      "<b>3 Độc: </b>" +
      dataObj["badoc"] +
      "<br>";
  }
  $(id).html(html);
}
