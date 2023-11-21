import Person from "./Person.js";

class Employee extends Person {
  constructor(ma, hoTen, diaChi, email, soNgayLam, luongTheoNgay) {
    super(ma, hoTen, diaChi, email);
    this.loaiUser = "Nhân viên";
    this.soNgayLam = soNgayLam;
    this.luongTheoNgay = luongTheoNgay;
  }

  tinhLuong() {
    return this.luongTheoNgay * 1 * (this.soNgayLam * 1);
  }
}

export default Employee;
