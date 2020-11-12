using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class SinhVienService
  {
    public async Task<Response<SinhVien>> CapNhatSinhVien(long id, TaoSinhVienRequest request)
    {
      var existsSinhVien = await _sinhVienRepo.GetSinhVienById(id);

      if (existsSinhVien == null)
        return new Response<SinhVien>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      existsSinhVien.HoTen = request.HoTen;
      existsSinhVien.Email = request.Email;
      existsSinhVien.SoDienThoai = request.SoDienThoai;
      existsSinhVien.DiaChi = request.DiaChi;
      existsSinhVien.MSSV = request.MSSV;
      existsSinhVien.GioiTinh = request.GioiTinh;

      var updatedSinhVien = await _sinhVienRepo.UpdateSinhVien(existsSinhVien);

      return new Response<SinhVien>
      {
        StatusCode = 200,
        Success = true,
        Data = updatedSinhVien
      };
    }
  }
}