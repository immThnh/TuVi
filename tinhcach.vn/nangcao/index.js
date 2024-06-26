const table = {
    1: ["A", "J", "S"],
    2: ["B", "K", "T"],
    3: ["C", "L", "U"],
    4: ["D", "M", "V"],
    5: ["E", "N", "W"],
    6: ["F", "O", "X"],
    7: ["G", "P", "Y"],
    8: ["H", "Q", "Z"],
    9: ["I", "R"],
};

const masters = [11, 22, 33];

const nguyenAms = ["U", "E", "O", "A", "I", "Y"];
const NGUYEN_AM = 1;
const PHU_AM = 2;
const NONE = 0;

const transferDayToNumber = (ngay, isDay) => {
    if (((ngay == 11 || ngay == 22) && isDay) || ngay < 10) return ngay;
    let result = 0;
    if (isNaN(ngay)) {
        console.error("Giá trị đầu vào không phải là số");
        return 0;
    }
    while (ngay !== 0) {
        result += ngay % 10;
        ngay = Math.floor(ngay / 10);
    }
    return +result;
};

const transferStringToNumber = (data) => {
    let result = 0;
    data.split("").forEach((char) => {
        Object.entries(table).forEach(([key, value]) => {
            if (value.includes(char.toUpperCase())) result += parseInt(key);
        });
    });
    return result;
};

const transferCharToNumber = (char) => {
    for (const [key, value] of Object.entries(table)) {
        if (value.includes(char.toUpperCase())) {
            return +key;
        }
    }
    return 0;
};

const transferNameToUnMarked = (name) => {
    return name
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

const SoMenhLon_congNgang = (name) => {
    name = transferNameToUnMarked(name);
    let result = "";
    let processData = transferStringToNumber(name);
    result += processData;
    processData = transferDayToNumber(processData, false);
    result += "/" + processData;
    while (processData >= 10) {
        processData = transferDayToNumber(processData, false);
        result += "/" + processData;
    }
    return result;
};

const CongDoc = (name, type = NONE) => {
    let result = "";
    let temp = 0;
    name.trim()
        .split("")
        .forEach((char, index) => {
            const upperChar = char.toUpperCase();
            if (upperChar === " ") {
                result += temp + "/";
                temp = 0;
            } else if (type === NGUYEN_AM && nguyenAms.includes(upperChar)) {
                if (upperChar !== "Y" || YIsNguyenAm(name, index))
                    temp += +transferCharToNumber(char);
            } else if (
                type === PHU_AM &&
                ((upperChar === "Y" && !YIsNguyenAm(name, index)) ||
                    !nguyenAms.includes(upperChar))
            ) {
                temp += parseInt(transferCharToNumber(upperChar));
            } else if (type === NONE) {
                temp += parseInt(transferCharToNumber(upperChar));
            }
            if (index === name.length - 1) {
                result += temp;
            }
        });
    return result;
};

const isMasterNumber = (number) => {
    return +number === 11 || number === 22 || number === 33;
};

const transferHaiChuSoToMotChuSo = (number) => {
    let result = number;
    let temp = result;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
        result += "/" + temp;
    }
    return result;
};

const SoMenhLon_CongDoc = (name) => {
    name = transferNameToUnMarked(name);
    let result = "";
    let temp = 0;

    result = CongDoc(name);

    result.split("/").forEach((e) => {
        if (e == 11 || e == 22 || e == 33) temp += +e;
        else temp += +transferDayToNumber(e, true);
    });
    result = "";
    result += temp;

    if (temp > 10) {
        result += "/" + transferDayToNumber(temp, false);
    }
    return result;
};

const SoMenhNho = (name) => {
    console.log("Cộng dọc: " + SoMenhLon_CongDoc(name));
    console.log("Cộng ngang: " + SoMenhLon_congNgang(name));
};

const YIsNguyenAm = (name, indexY) => {
    if (indexY === name.length - 1 && indexY === 0) return true;
    if (
        indexY >= 1 &&
        nguyenAms.includes(
            name[indexY - 1].toUpperCase() || name[indexY + 1].toUpperCase()
        )
    )
        return false;
    return true;
};

const LinhHonLon_CongNgang = (name) => {
    let result = 0;
    name = transferNameToUnMarked(name);
    name.split("").forEach((element, index) => {
        let char = element.toUpperCase();
        if (nguyenAms.includes(char)) {
            if (char !== "Y" || (char === "Y" && YIsNguyenAm(name, index)))
                result += +transferCharToNumber(char);
        }
    });
    const temp = transferDayToNumber(result, false);
    if (temp !== result) {
        result += "/" + temp;
    }
    return result;
};

const LinhHonLon_CongDoc = (name) => {
    name = transferNameToUnMarked(name);
    let result = CongDoc(name, NGUYEN_AM);
    let temp = 0;
    result.split("/").forEach((e) => {
        temp += +transferDayToNumber(e, true);
    });
    if (temp >= 10) {
        result = temp + "/" + transferDayToNumber(temp, false);
    } else result = temp;
    return result;
};

const LinhHonNho = (name) => {
    name = transferNameToUnMarked(name);
    console.log("cong doc: " + LinhHonLon_CongDoc(name));
    console.log("cong ngang: " + LinhHonLon_CongNgang(name));
};

const NhanCachLon_CongNgang = (name) => {
    let result = 0;
    name = transferNameToUnMarked(name);
    name.split("").forEach((element, index) => {
        let char = element.toUpperCase();
        if (
            (char === "Y" && !YIsNguyenAm(name, index)) ||
            !nguyenAms.includes(char)
        ) {
            result += +transferCharToNumber(char);
        }
    });
    let temp = transferDayToNumber(result, false);
    result += "/" + temp;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
        result += "/" + temp;
    }
    return result;
};

const NhanCachLon_CongDoc = (name) => {
    name = transferNameToUnMarked(name);
    let result = CongDoc(name, PHU_AM);
    let temp = 0;
    result.split("/").forEach((e) => {
        temp += +transferDayToNumber(e, true);
    });
    while (temp >= 10) {
        result = temp + "/" + transferDayToNumber(temp, false);
        temp = transferDayToNumber(temp, false);
    }
    return result;
};

const ChiSoDuongDoi_CongNgang = (date) => {
    let result = 0;
    date.split("/").forEach((e, index) => {
        if (index == 2) {
            result += transferDayToNumber(e, false);
        } else result += +e;
    });

    let temp = result;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
        result += "/" + temp;
    }
    return result;
};

const ChiSoDuongDoi_CongDoc = (date) => {
    let result = 0;
    date.split("/").forEach((e) => {
        let number = parseInt(e);
        let temp = +transferDayToNumber(number, true);
        while (temp > 10 && temp !== 11 && temp !== 22 && temp !== 33) {
            temp = +transferDayToNumber(temp, true);
        }
        result += temp;
    });

    let temp = result;
    while (temp >= 10) {
        temp = transferDayToNumber(result, true);
        result += "/" + temp;
    }
    return result;
};

const rutGonNamSinh = (date) => {
    let result = 0;
    let temp = 0;
    date.split("").forEach((e, index) => {
        result += +e;
    });
    while (result >= 10) {
        temp = result;
        result = transferDayToNumber(result, false);
    }
    if (temp === 11 || temp === 22 || temp === 33) return temp + "/" + result;
    return result + "/" + temp;
};

const transferNgayThangToFormatSet = (date, isRevert = true) => {
    const temp = transferDayToNumber(date, false);
    if (date == 11 || date == 22 || date == 33) {
        return isRevert ? date + "/" + temp : temp + "/" + date;
    }
    return isRevert ? temp + "/" + date : date + "/" + temp;
};

const BaChuKyVongDoi = (date) => {
    let result = "";
    const array = date.split("/");
    console.log(
        "Chu ky vong doi 1: " + transferNgayThangToFormatSet(array[1], true)
    );
    console.log(
        "Chu ky vong doi 2: " + transferNgayThangToFormatSet(array[0], true)
    );
    console.log("Chu ky vong doi 3: " + rutGonNamSinh(array[2], false));
    return (
        transferNgayThangToFormatSet(array[1], true) +
        "-" +
        transferNgayThangToFormatSet(array[0], true) +
        "-" +
        rutGonNamSinh(array[2], false)
    );
};

const getSoDuongDoi = (date) => {
    const duongDoiNgang = ChiSoDuongDoi_CongNgang(date).split("/");
    const duongDoiDoc = ChiSoDuongDoi_CongDoc(date).split("/");
    return duongDoiNgang[duongDoiNgang.length - 1] == 11 ||
        duongDoiNgang[duongDoiNgang.length - 1] == 22 ||
        duongDoiNgang[duongDoiNgang.length - 1] == 33
        ? duongDoiNgang[duongDoiNgang.length - 1]
        : duongDoiDoc[duongDoiDoc.length - 1];
};

const BonGiaiDoanCuocDoi = (date) => {
    const array = date.split("/");
    date.split("/").forEach((e, index) => {});
    rutGonNamSinh(array[2]);
    const ngaySinhRutGon = transferNgayThangToFormatSet(array[0]);
    const thangSinhRutGon = transferNgayThangToFormatSet(array[1]);
    const namSinhRutGon = rutGonNamSinh(array[2]);

    const ngaySinh = +ngaySinhRutGon.split("/")[0];
    const thangSinh = +thangSinhRutGon.split("/")[0];
    const namSinh = +namSinhRutGon.split("/")[0];

    const dinhMot = transferNgayThangToFormatSet(thangSinh + ngaySinh, true);

    const dinhHai = transferNgayThangToFormatSet(ngaySinh + namSinh, true);

    const dinhBa = transferNgayThangToFormatSet(
        +dinhHai.split("/")[0] + +dinhMot.split("/")[0],
        true
    );

    const dinhBon = transferNgayThangToFormatSet(thangSinh + namSinh);
    console.log(
        "Dinh 1: " + dinhMot,
        "Dinh 2: " + dinhHai,
        "Dinh 3: " + dinhBa,
        "Dinh 4: " + dinhBon
    );

    const soDuongDoi = getSoDuongDoi(date);

    const soDinhCaoDauTien = 36 - soDuongDoi;
    const namDinhCaoDauTien = array[2] + soDinhCaoDauTien;
    console.log(soDinhCaoDauTien);
    console.log("Nam dinh cao dau tien: " + namDinhCaoDauTien);
    console.log("Nam dinh coa tiep theo" + namDinhCaoDauTien + 9);
};

const rutGonNgayThang = (date) => {
    let temp = date;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
    }
    return temp;
};

const BonGiaoDoanThuThach = (date) => {
    const array = date.split("/");
    date.split("/").forEach((e, index) => {});
    const ngaySinhRutGon = transferDayToNumber(array[0], false);
    const thangSinhRutGon = transferDayToNumber(array[1], false);
    const namSinhRutGon = transferDayToNumber(
        transferDayToNumber(array[2], false),
        false
    );
    const thuThach1 = thangSinhRutGon - ngaySinhRutGon;
    console.log(thangSinhRutGon, namSinhRutGon);
    const thuThach2 = Math.abs(ngaySinhRutGon - namSinhRutGon);
    const thuThach3 = Math.abs(thuThach1 - thuThach2);
    const thuThach4 = Math.abs(thangSinhRutGon - namSinhRutGon);
    console.log(
        "Thu thach 1: " + thuThach1,
        "Thu thach 2: " + thuThach2,
        "Thu thach 3: " + thuThach3,
        "Thu thach 4: " + thuThach4
    );
};
//!NOTE ----------------Chua xong-----------
const TruongThanh_CongDoc = (name, date) => {
    let result = "";
    const arr1 = SoMenhLon_CongDoc(name).split("/");
    const arr2 = ChiSoDuongDoi_CongDoc(date).split("/");
    const suMenh = arr1[arr1.length - 1];
    const duongDoi = arr2[arr2.length - 1];

    return transferHaiChuSoToMotChuSo(+suMenh + +duongDoi, false);
};

const TruongThanh_CongNgang = (name, date) => {
    const arr1 = SoMenhLon_congNgang(name).split("/");
    const arr2 = ChiSoDuongDoi_CongNgang(date).split("/");
    const suMenh = arr1[0];
    const duongDoi = arr2[0];
    return transferHaiChuSoToMotChuSo(+suMenh + +duongDoi, false);
};

const ThaiDo_CongNgang = (date) => {
    const ngaySinh = date.split("/")[0];
    const thangSinh = date.split("/")[1];
    let result = 0;
    result += +ngaySinh + +thangSinh;
    result += "/" + transferDayToNumber(result, false);
    return result;
};

const ThaiDo_CongDoc = (date) => {
    const ngaySinh = transferDayToNumber(date.split("/")[0], true);
    const thangSinh = transferDayToNumber(date.split("/")[1], true);
    let result = 0;
    result += +ngaySinh + +thangSinh;
    result += "/" + transferDayToNumber(result, false);
    return result;
};

const KetNoiGiuaDuongDoiVaSoMenh_Ngang = (name, date) => {
    const duongDoi = ChiSoDuongDoi_CongNgang(date).split("/")[0];
    const soMenh = SoMenhLon_congNgang(name).split("/")[0];
    return Math.abs(duongDoi - soMenh) + "";
};

const KetNoiGiuaDuongDoiVaSoMenh_Doc = (name, date) => {
    const array1 = ChiSoDuongDoi_CongDoc(date).split("/");
    let hasMaster = false;
    const array2 = SoMenhLon_congNgang(name).split("/");
    let duongDoi = array1[array1.length - 1];
    let soMenh = array2[array2.length - 1];
    let result1 = Math.abs(duongDoi - soMenh);
    for (var i = 0; i < array1.length; i++) {
        if ([11, 22, 33].includes(array1[i])) {
            duongDoi = array1[i];
            hasMaster = true;
        }
        if ([11, 22, 33].includes(array2[i])) {
            soMenh = array2[i];
            hasMaster = true;
        }
    }

    return hasMaster
        ? result1 + " hay " + Math.abs(duongDoi - soMenh)
        : result1 + "";
};

const ChiSoThieu = (name) => {
    const ints = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    name = transferNameToUnMarked(name);
    name.split("").forEach((char) => {
        ints.forEach((e) => {
            if (e === transferCharToNumber(char)) {
                ints.splice(ints.indexOf(e), 1);
            }
        });
    });

    return ints;
};

//!NOTE chua xong
const NoNghiep = (date) => {
    // duong doi
    const noNghieps = ["13/4", "14/5", "16/7", "19/1"];
    const suMenh = SoMenhLon_CongDoc(date);
    const duongDoi = ChiSoDuongDoi_CongDoc(date);
    const linhHon = LinhHonLon_CongDoc(date);
    const nhanCach = NhanCachLon_CongDoc(date);
    const ngaySinh = transferDayToNumber(date.split("/")[0], true);
    const thaiDo = ThaiDo_CongDoc(date);
    // const truongThanh = TruongThanh_CongDoc(date);
    console.log(
        "duong doi: " + duongDoi,
        "su menh: " + suMenh,
        "linh hon: " + linhHon,
        "nhan cach: " + nhanCach,
        "ngaySinh: " + ngaySinh,
        "Thai do: " + thaiDo
        // truongThanh
    );
    const baChuKyVongDoi = BaChuKyVongDoi(date).split("-");

    return [
        duongDoi,
        suMenh,
        linhHon,
        nhanCach,
        ngaySinh,
        thaiDo,
        truongThanh,
        BaChuKyVongDoi,
        ...baChuKyVongDoi,
    ].some((value) => noNghieps.includes(value));
};

const NamCaNhan_CongNgang = (date) => {
    let result = 0;
    const array = date.split("/");
    const month = array[1];
    month == 12 ? (result += 12) : (result += transferDayToNumber(month, true));

    result +=
        +transferDayToNumber(array[2], true) +
        +transferDayToNumber(array[0], true);
    let temp = result;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
        result += "/" + temp;
    }
    return result;
};

const NamCaNhan_CongDoc = (date) => {
    let result = 0;
    let ngay = +transferDayToNumber(date.split("/")[0], true);
    let thang = +transferDayToNumber(date.split("/")[1], true);
    let nam = +transferDayToNumber(date.split("/")[2], true);
    result += ngay + thang + nam;
    let temp = result;
    while (temp >= 10) {
        temp = transferDayToNumber(temp, false);
        result += "/" + temp;
    }
    return result;
};

const TuDuyHopLy_Doc = (name, date) => {
    const soMenhNho_CongDoc = +SoMenhLon_CongDoc(name).split("/")[0];
    const ngay = transferDayToNumber(date.split("/")[0], true);
    return transferHaiChuSoToMotChuSo(ngay + soMenhNho_CongDoc);
};

const TuDuyHopLy_Ngang = (name, date) => {
    const soMenhNho_CongNgang = +SoMenhLon_congNgang(name).split("/")[0];
    const ngay = transferDayToNumber(date.split("/")[0], true);
    return transferHaiChuSoToMotChuSo(ngay + +soMenhNho_CongNgang);
};

const DiemBaoMat = (name) => {
    name = name.trim().replace(/ /g, "");
    return name.length === 11 ||
        name.length === 22 ||
        name.length === 33 ||
        name.length === 13 ||
        name.length === 14 ||
        name.length === 16 ||
        name.length === 19
        ? name.length
        : transferHaiChuSoToMotChuSo(name.length);
};

const PhanHoiTiemThuc = (name) => {
    return 9 - ChiSoThieu(name).length;
};

const CanBang = (name) => {
    let congNgang = 0;
    let congDoc = 0;
    name = transferNameToUnMarked(name);
    name.split(" ").forEach((char) => {
        congDoc += transferDayToNumber(char[0].charCodeAt(0) - 64, true);
        congNgang += char[0].charCodeAt(0) - 64;
    });
    console.log("Cong doc:" + transferHaiChuSoToMotChuSo(congDoc));
    console.log("Cong ngang:" + transferHaiChuSoToMotChuSo(congNgang));
};

const resetDate = () => {
    $("#gioithieu").addClass("hidden");
    $("#bangthanso").removeClass("hidden");
    $("#componetthanso").addClass("hidden");
    $("#showform").removeClass("hidden");
    // ----------------------- end ẨN HIỆN FORM ------------------------
    // ----------------------- XOÁ DỮ LIỆU BAN ĐẦU ------------------------
    $("#finalSoDuongDoi").html("");
    $("#hoVaTen").html("");
    $("#tacY").html("");
    $("#sinhNhat").html("");
    $("#tuoiSinhNhat").html("");
    $("#dinh1").html("");
    $("#dinh2").html("");
    $("#dinh3").html("");
    $("#dinh4").html("");
    $("#soDinh1").html("");
    $("#soDinh2").html("");
    $("#soDinh3").html("");
    $("#soDinh4").html("");
    $("#soDuongDoi").html("");
    $("#soVanMenh").html("");
    $("#soTruongThanh").html("");
    $("#soTenTacY").html("");
    $("#soNgaySinh").html("");
    $("#soTen").html("");
    $("#soBieuLo").html("");
    $("#soNoiTam").html("");
    $("#so1").html("");
    $("#so2").html("");
    $("#so3").html("");
    $("#so4").html("");
    $("#so5").html("");
    $("#so6").html("");
    $("#so7").html("");
    $("#so8").html("");
    $("#so9").html("");
    $("#so10").html("");
    $("#so11").html("");
    $("#so20").html("");
    $("#so22").html("");
    $("#so30").html("");
    $("#so33").html("");
    $("#sochitiet_ten").html("");
    $("#sochitiet_noitam").html("");
    $("#sochitiet_bieulo").html("");
    $("#sochitiet_vanmenh").html("");
    $("#sochitiet_truongthanh").html("");
    $("#sochitiet_duongdoi").html("");
    $("#sochitiet_tacy").html("");

    // lớp nâng cao
    $("#thuthach1").html("");
    $("#thuthach2").html("");
    $("#thuthach3").html("");
    $("#thuthach4").html("");

    $("#namCaNhan").html("");
    $("#thangCaNhan").html("");
    $("#ngayCaNhan").html("");

    $("#sochitiet_tuduylitri").html("");
    $("#sochitiet_canbang").html("");
    $("#sochitiet_chudaovanmenh").html("");
    $("#sochitiet_noitambieulo").html("");
    $("#sochitiet_sothieu").html("");
    $("#sochitiet_sucmanhtiemthuc").html("");

    $("#nonghiep_chudao").html("");
    $("#nonghiep_vanmenh").html("");
    $("#nonghiep_truongthanh").html("");
    $("#nonghiep_ngaysinh").html("");
    $("#nonghiep_ten").html("");
    $("#nonghiep_noitam").html("");
    $("#nonghiep_bieulo").html("");
};

const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
};

const getChiSo = (doc, ngang, isKetNoi = false) => {
    doc += "";
    ngang += "";
    let result = 0;
    if (!doc) return ngang;
    if (!ngang) return doc;
    doc.split("/").forEach((e) => {
        if (masters.includes(+e)) result = +e;
    });
    ngang.split("/").forEach((e) => {
        if (masters.includes(+e)) result = +e;
    });
    let temp = ngang.split;
    if (!masters.includes(+result))
        result = !isKetNoi
            ? ngang.split("/")[ngang.split("/").length - 1]
            : doc.split("/")[doc.split("/").length - 1];
    return result;
};

$(document).ready(function () {
    $("#hodem, #ten, #tentacy, #ngay, #thang, #nam").on("change", validateForm);

    $("#thanso").submit(function (e) {
        e.preventDefault();
        resetDate();

        //! ---------- Xử lý input -----------
        var hoDem = $("#hodem").val();
        var ten = $("#ten").val();
        var hoVaTen = hoDem + " " + ten;
        var tenThuongGoi = $("#inputTenThuongGoi").val();
        var inputNgay = $("#ngay").val();
        var inputThang = $("#thang").val();
        var inputNam = $("#nam").val();

        var sinhNhat = inputNgay + "/" + inputThang + "/" + inputNam;
        var tuoiSinhNhat = tinhTuoiSinhNhat(sinhNhat);
        //! ---------- END Xử lý input -----------

        //! ---------- Xử lý dữ liệu -----------
        var duongDoi_Doc = ChiSoDuongDoi_CongDoc(sinhNhat);
        var duongDoi_Ngang = ChiSoDuongDoi_CongNgang(sinhNhat);
        var duongDoi_ChiSo = getChiSo(duongDoi_Doc, duongDoi_Ngang, false);

        var suMenhLon_Doc = SoMenhLon_CongDoc(hoVaTen);
        var suMenhLon_Ngang = SoMenhLon_congNgang(hoVaTen);
        var suMenhLon_ChiSo = getChiSo(suMenhLon_Doc, suMenhLon_Ngang, false);

        var ketNoi_Doc = KetNoiGiuaDuongDoiVaSoMenh_Doc(hoVaTen, sinhNhat);
        var ketNoi_Ngang = KetNoiGiuaDuongDoiVaSoMenh_Ngang(hoVaTen, sinhNhat);
        var ketNoi_ChiSo = getChiSo(ketNoi_Doc, ketNoi_Ngang, true);

        var truongThanh_Doc = TruongThanh_CongDoc(hoVaTen, sinhNhat);
        var truongThanh_Ngang = TruongThanh_CongNgang(hoVaTen, sinhNhat);
        var truongThanh_ChiSo = getChiSo(truongThanh_Doc, truongThanh_Ngang, false);

        var linhHonNho_Doc = LinhHonLon_CongDoc(tenThuongGoi || ten);
        var linhHonNho_Ngang = LinhHonLon_CongNgang(tenThuongGoi || ten);
        var linhHonNho_ChiSo = getChiSo(linhHonNho_Doc, linhHonNho_Ngang, false);

        var nhanCachNho_Doc = NhanCachLon_CongDoc(ten);
        var nhanCachNho_Ngang = NhanCachLon_CongNgang(ten);
        var nhanCachNho_ChiSo = getChiSo(nhanCachNho_Doc, nhanCachNho_Ngang, false);

        var nhanCachLon_Doc = NhanCachLon_CongDoc(hoVaTen);
        var nhanCachLon_Ngang = NhanCachLon_CongNgang(hoVaTen);
        var nhanCachLon_ChiSo = getChiSo(nhanCachLon_Doc, nhanCachLon_Ngang, false);

        var soMenhNho_Doc = SoMenhLon_CongDoc(ten);
        var soMenhNho_Ngang = SoMenhLon_congNgang(ten);
        var soMenhNho_ChiSo = getChiSo(soMenhNho_Doc, soMenhNho_Ngang, false);

        var ngaySinh_Doc = inputNgay;
        var ngaySinh_Ngang = transferHaiChuSoToMotChuSo(inputNgay, true);
        var ngaySinh_ChiSo = getChiSo(ngaySinh_Doc, ngaySinh_Ngang, false);

        var tuDuyHopLy_Doc = TuDuyHopLy_Doc(tenThuongGoi || ten, sinhNhat);
        var tuDuyHopLy_Ngang = TuDuyHopLy_Ngang(tenThuongGoi || ten, sinhNhat);
        var tuDuyHopLy_ChiSo = getChiSo(tuDuyHopLy_Doc, tuDuyHopLy_Ngang, false);

        var thieu = ChiSoThieu(hoVaTen).join(" - ");

        var phanHoiTiemThuc_Doc = PhanHoiTiemThuc(hoVaTen);

        var linhHonLon_Doc = LinhHonLon_CongDoc(hoVaTen);
        var linhHonLon_Ngang = LinhHonLon_CongNgang(hoVaTen);
        var linhHonLon_ChiSo = getChiSo(linhHonLon_Doc, linhHonLon_Ngang, false);

        var diemBaoMat = DiemBaoMat(hoVaTen);
        var diemBaoMat_ChiSo = getChiSo(diemBaoMat, diemBaoMat, false);

        var soMenhLon_Doc = SoMenhLon_CongDoc(hoVaTen);
        var soMenhLon_Ngang = SoMenhLon_congNgang(hoVaTen);
        var soMenhLon_ChiSo = getChiSo(soMenhLon_Doc, soMenhLon_Ngang, false);

        //! ----------END Xử lý dữ liệu -----------

        //! ---------- Hiển thị dữ liệu -----------
        $("#hoVaTen").html(hoVaTen);
        $("#hoVaTen1").html(hoVaTen);
        $("#ngaySinh").html(sinhNhat);
        $("#ngayHienTai").html(getCurrentDate());
        $("#tenThuongGoi").html(tenThuongGoi);
        $("#tuoiSinhNhat").html(tuoiSinhNhat);

        $("#duongDoi_Doc").html(duongDoi_Doc);
        $("#duongDoi_Ngang").html(duongDoi_Ngang);
        $("#duongDoi_ChiSo").html(duongDoi_ChiSo);

        $("#suMenhLon_Doc").html(suMenhLon_Doc);
        $("#suMenhLon_Ngang").html(suMenhLon_Ngang);
        $("#suMenhLon_ChiSo").html(suMenhLon_ChiSo);

        $("#ketNoi_Doc").html(ketNoi_Doc);
        $("#ketNoi_Ngang").html(ketNoi_Ngang);
        $("#ketNoi_ChiSo").html(ketNoi_ChiSo);

        $("#truongThanh_Doc").html(truongThanh_Doc);
        $("#truongThanh_Ngang").html(truongThanh_Ngang);
        $("#truongThanh_ChiSo").html(truongThanh_ChiSo);

        $("#linhHonNho_Doc").html(linhHonNho_Doc);
        $("#linhHonNho_Ngang").html(linhHonNho_Ngang);
        $("#linhHonNho_ChiSo").html(linhHonNho_ChiSo);

        $("#nhanCachLon_Doc").html(nhanCachLon_Doc);
        $("#nhanCachLon_Ngang").html(nhanCachLon_Ngang);
        $("#nhanCachLon_ChiSo").html(nhanCachLon_ChiSo);

        $("#nhanCachNho_Doc").html(nhanCachNho_Doc);
        $("#nhanCachNho_Ngang").html(nhanCachNho_Ngang);
        $("#nhanCachNho_ChiSo").html(nhanCachNho_ChiSo);

        $("#soMenhNho_Doc").html(soMenhNho_Doc);
        $("#soMenhNho_Ngang").html(soMenhNho_Ngang);
        $("#soMenhNho_ChiSo").html(soMenhNho_ChiSo);

        $("#ngaySinh_Doc").html(ngaySinh_Doc);
        $("#ngaySinh_Ngang").html(ngaySinh_Ngang);
        $("#ngaySinh_ChiSo").html(ngaySinh_ChiSo);

        $("#tuDuyHopLy_Doc").html(tuDuyHopLy_Doc);
        $("#tuDuyHopLy_Ngang").html(tuDuyHopLy_Ngang);
        $("#tuDuyHopLy_ChiSo").html(tuDuyHopLy_ChiSo);

        $("#thieu").html(thieu);

        $("#phanHoiTiemThuc_Doc").html(phanHoiTiemThuc_Doc);
        $("#phanHoiTiemThuc_ChiSo").html(phanHoiTiemThuc_Doc);

        $("#diemBaoMat").html(diemBaoMat);
        $("#diemBaoMat_ChiSo").html(diemBaoMat_ChiSo);

        $("#soMenhNho_Doc").html(soMenhNho_Doc);
        $("#soMenhNho_Ngang").html(soMenhNho_Ngang);
        $("#soMenhNho_ChiSo").html(soMenhNho_ChiSo);

        $("#soMenhLon_Doc").html(soMenhLon_Doc);
        $("#soMenhLon_Ngang").html(soMenhLon_Ngang);
        $("#soMenhLon_ChiSo").html(soMenhLon_ChiSo);

        $("#linhHonLon_Doc").html(linhHonLon_Doc);
        $("#linhHonLon_Ngang").html(linhHonLon_Ngang);
        $("#linhHonLon_ChiSo").html(linhHonLon_ChiSo);
    });
});
