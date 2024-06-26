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
const nguyenAms = ["U", "E", "O", "A", "I", "Y"];
const NGUYEN_AM = 1;
const PHU_AM = 2;
const NONE = 0;

const transferDayToNumber = (ngay, isDay) => {
    let temp = +ngay;
    if (((ngay == 11 || ngay == 22) && isDay) || ngay < 10) return ngay;
    let result = 0;
    if (isNaN(ngay)) {
        console.error("Giá trị đầu vào không phải là số");
        return 0;
    }
    while (temp !== 0) {
        result += temp % 10;
        temp = Math.floor(temp / 10);
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
    console.log(temp);
    while (temp >= 10) {
        result = temp + "/" + transferDayToNumber(temp, false);
        temp = transferDayToNumber(temp, false);
    }
    console.log(result);
    return result;
};

const NhanCachNho = (name) => {
    name = transferNameToUnMarked(name);
    console.log("cong doc: " + NhanCachLon_CongDoc(name));
    console.log("cong ngang: " + NhanCachLon_CongNgang(name));
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
    const namDinhCaoDauTien = +array[2] + +soDinhCaoDauTien;
    console.log(soDinhCaoDauTien);
    console.log("Nam dinh cao dau tien: " + namDinhCaoDauTien);
    console.log("Nam dinh coa tiep theo " + +namDinhCaoDauTien + 9);
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
    const arr1 = SoMenhLon_CongDoc(name).split("/");
    const arr2 = ChiSoDuongDoi_CongDoc(date).split("/");
    const suMenh = arr1[arr1.length - 1];
    const duongDoi = arr2[arr2.length - 1];
    console.log(
        "Cong doc: " + transferHaiChuSoToMotChuSo(suMenh + duongDoi, false)
    );
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
    return Math.abs(duongDoi - soMenh);
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
        : result1;
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
        // truongThanh,
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

const TuDuyHopLy = (name, date) => {
    const soMenhNho_CongNgang = +SoMenhLon_congNgang(name).split("/")[0];
    const soMenhNho_CongDoc = +SoMenhLon_CongDoc(name).split("/")[1];
    const ngay = +date.split("/")[0];
    let temp = ngay + soMenhNho_CongNgang;
    console.log("Cong ngang: " + transferHaiChuSoToMotChuSo(temp));
    console.log(
        "Cong doc: " +
            transferHaiChuSoToMotChuSo(
                transferDayToNumber(ngay, true) + +soMenhNho_CongDoc
            )
    );
};

const DiemBaoMat = (name) => {
    name = name.trim();
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

//!NOTE -----------------------TEST------------------------

const testCanBang = () => {
    const name = "Vo Tran Hoang Yen";
    console.log(name);
    CanBang(name);
};

const testPhanHoiTiemThuc = () => {
    const name = "Nguyen Minh Hang";
    console.log(name);
    console.log(PhanHoiTiemThuc(name));
};

const testdiemBaoMat = () => {
    const name = "Nguyen Minh Xuan";
    console.log(name);
    console.log(DiemBaoMat(name));
};

const testTuDuyHopLy = () => {
    const name = "Phuong Anh";
    const date = "29/03/1993";
    console.log(name, date);
    TuDuyHopLy(name, date);
};

const testNamCaNhan = () => {
    const date = "11/12/2004";
    const temp = "11/12/2023";
    console.log(temp);
    console.log("Cong ngang: " + NamCaNhan_CongNgang(temp));
    console.log("Cong doc: " + NamCaNhan_CongDoc(temp));
};

const testNoNghiep = () => {
    const date = "24/04/1995";
    console.log(date);
    console.log(NoNghiep(date));
};

const testChiSoThieu = () => {
    const name = "vi van chung";
    console.log(name);
    console.log(ChiSoThieu(name));
};

const testKetNoiGiuaDuongDoiVaSoMenh = () => {
    const date = " 21/11/1986";
    const name = "Vi Van Chung";
    console.log(name);
    console.log(KetNoiGiuaDuongDoiVaSoMenh_Doc(name, date));
    console.log(KetNoiGiuaDuongDoiVaSoMenh_Ngang(name, date));
};

const testThaiDo = () => {
    const date = "12/11/2001";
    console.log(date);
    console.log(ThaiDo_CongNgang(date));
    console.log(ThaiDo_CongDoc(date));
};

//!NOTE ----------------Chua xong-----------
const testTruongThanh = () => {
    const date = "21/11/1986";
    const name = "Vi van Chung";
    console.log(name + ": " + date);
    TruongThanh_CongDoc(name, date);
};

const testBaChuKyVongDoi = () => {
    const date = "21/11/1986";
    console.log(date);
    BaChuKyVongDoi(date);
};

const testBonGiaiDoanThuThach = () => {
    const date = "20/11/1980";
    console.log(date);
    BonGiaoDoanThuThach(date);
};

const testBoniaiDoanCuocDoi = () => {
    const date = "20/11/1980";
    console.log(BonGiaiDoanCuocDoi(date));
};

const testChiSoDuongDoi = () => {
    const date = "21/11/1986";
    console.log("CONG NGANG: " + date + " :" + ChiSoDuongDoi_CongNgang(date));
    console.log("CONG DOC: " + date + " :" + ChiSoDuongDoi_CongDoc(date));
};

const testNgaySinh = () => {
    let ngaySinh = 11;
    console.log(ngaySinh);
    console.log(transferDayToNumber(ngaySinh, true));
};

const testSoMenhLon = () => {
    let name = "Vi Van Chung";
    console.log(
        "Số Mệnh lớn theo CỘNG DỌC của " + name + ":" + SoMenhLon_CongDoc(name)
    );
    console.log(
        "Số Mệnh lớn theo CỘNG NGANG của " +
            name +
            ":" +
            SoMenhLon_congNgang(name)
    );
};

const testSoMenhNho = () => {
    const name = "Hoang";
    console.log(name);
    SoMenhNho(name);
};

const testLinhHonLon = () => {
    const name = "Vi van chung";
    console.log(
        "LINH HỒN LỚN theo CỘNG DỌC của " +
            name +
            ": " +
            LinhHonLon_CongDoc(name)
    );
    console.log(
        "LINH HỒN LỚN theo CỘNG NGANG của " +
            name +
            ": " +
            LinhHonLon_CongNgang(name)
    );
};

const testLinhHonNho = () => {
    const name = "Chung";
    console.log(LinhHonNho(name));
};

const testNhanCachLon = () => {
    const name = "Nguyễn Văn Toản";
    console.log(
        "NHÂN CÁCH LỚN theo CỘNG DỌC của " +
            name +
            ": " +
            NhanCachLon_CongDoc(name)
    );
    console.log(
        "NHÂN CÁCH LỚN theo CỘNG NGANG của Nguyễn Minh Loc" +
            ": " +
            NhanCachLon_CongNgang("Nguyễn Minh Loc")
    );
};

const testNhanCachNho = () => {
    const name = "Chung";
    console.log(name);
    NhanCachNho(name);
};

const showAllTest = () => {
    console.log("------------------Test Ngay Sinh------------");
    testNgaySinh();
    console.log("------------------Test Số mệnh lớn------------");
    testSoMenhLon();
    console.log("------------------Test số mệnh nhỏ:------------");
    testSoMenhNho();
    console.log("------------------Test linh hồn lớn:------------");
    testLinhHonLon();
    console.log("------------------Test nhân cách lơn:------------");
    testNhanCachLon();
    console.log("------------------Test nhân cách nho:------------");
    testNhanCachNho();
    console.log("------------------Test chi so duong doi:------------");
    testChiSoDuongDoi();
    console.log("------------------Test bon giao doan cuoc doi:------------");
    testBoniaiDoanCuocDoi();
    console.log("------------------Test 3 chu ky vong doi:------------");
    testBaChuKyVongDoi();
    console.log("------------------Test thai do:------------");
    testThaiDo();
    console.log(
        "------------------Test ket noi giua duong doi va su menh lon:------------"
    );
    testKetNoiGiuaDuongDoiVaSoMenh();
    console.log("------------------Test chi so thieu:------------");
    testChiSoThieu();
    console.log("------------------Test no nghiep:------------");
    testNoNghiep();
    console.log("------------------Test nam ca nhan:------------");
    testNamCaNhan();
    console.log("------------------Test tu duy hop ly:------------");
    testTuDuyHopLy();
    console.log("------------------Test diem bao mat:------------");
    testdiemBaoMat();
    console.log("------------------Test phan hoi tiem thuc:------------");
    testPhanHoiTiemThuc();
    console.log("------------------Test can bang:------------");
    testCanBang();
};

// showAllTest();
testKetNoiGiuaDuongDoiVaSoMenh();
