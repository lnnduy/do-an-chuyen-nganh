using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class SinhVienService
  {
    public async Task<Response> XoaSinhVien(long id)
    {

      var existsSinhVien = await _sinhVienRepo.GetSinhVienById(id);

      if (existsSinhVien == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      await _sinhVienRepo.DeleteSinhVien(existsSinhVien);

      return new Response
      {
        StatusCode = 204,
        Success = true,
      };
    }
  }
}