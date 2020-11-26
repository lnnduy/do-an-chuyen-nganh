using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<List<ThiSinhResponse>>> GetDsThiSinhDaThamGia(long id)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null) return new Response<List<ThiSinhResponse>>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy ca thi" }
      };

      var dsThiSinh = _thiSinhRepo.GetAllThiSinhInCaThi(caThi.Id);
      var dsThiSinhResponse = new List<ThiSinhResponse>();

      foreach (var thiSinh in dsThiSinh)
      {
        var sinhVien = await _sinhVienRepo.GetSinhVienById(thiSinh.IdSinhVien);
        var thiSinhResponse = new ThiSinhResponse(sinhVien, thiSinh);
        dsThiSinhResponse.Add(thiSinhResponse);
      }

      return new Response<List<ThiSinhResponse>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsThiSinhResponse
      };
    }
  }
}