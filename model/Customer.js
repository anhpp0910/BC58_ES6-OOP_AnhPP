import Person from "./Person.js";

class Customer extends Person {
  constructor(ma, hoTen, diaChi, email, tenCty, triGiaHoaDon, danhGia) {
    super(ma, hoTen, diaChi, email);
    this.loaiUser = "Khách hàng";
    this.tenCty = tenCty;
    this.triGiaHoaDon = triGiaHoaDon;
    this.danhGia = danhGia;
  }
}

export default Customer;
