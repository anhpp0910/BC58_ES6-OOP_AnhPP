import Person from "./Person.js";

class Student extends Person {
  constructor(ma, hoTen, diaChi, email, diemToan, diemLy, diemHoa) {
    super(ma, hoTen, diaChi, email);
    this.loaiUser = "Sinh viên";
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
  }
  tinhDTB() {
    return (this.diemToan * 1 + this.diemLy * 1 + this.diemHoa * 1) / 3;
  }
}

export default Student;
