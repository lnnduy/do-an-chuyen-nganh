using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class SinhVienService
  {
    public async Task<Response<SinhVien>> ThemSinhVienVaoLop(long idLopHoc, TaoSinhVienRequest request)
    {
      var lopHoc = await _lopHocRepo.FindLopHocById(idLopHoc);

      if (lopHoc == null) return new Response<SinhVien>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy lớp học" }
      };

      var sinhVien = new SinhVien
      {
        HoTen = request.HoTen,
        Email = request.Email,
        SoDienThoai = request.SoDienThoai,
        GioiTinh = request.GioiTinh,
        DiaChi = request.DiaChi,
        IdLopHoc = idLopHoc,
        MSSV = request.MSSV
      };
      var newSinhVien = await _sinhVienRepo.CreateSinhVien(sinhVien);

      return new Response<SinhVien>
      {
        StatusCode = 201,
        Success = true,
        Errors = null,
        Data = newSinhVien
      };
    }
  }
}