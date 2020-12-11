using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response> NopBai(long idSinhVien, long idCaThi)
    {
      var caThi = await _caThiRepo.GetCaThiById(idCaThi);

      if (caThi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      var sinhVien = await _sinhVienRepo.GetSinhVienById(idSinhVien);

      if (sinhVien == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      var thiSinh = await _thiSinhRepo.GetThiSinhById(idCaThi, idSinhVien);

      if (thiSinh == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy thí sinh trong ca thi" }
        };

      thiSinh.TrangThaiThi = "Đã nộp bài";

      await _thiSinhRepo.UpdateThiSinh(thiSinh);

      return new Response
      {
        StatusCode = 200,
        Success = true
      };
    }
  }
}