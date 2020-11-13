using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CauHoiService
  {
    public async Task<Response<List<CauHoi>>> GetDsCauHoi(long idKhoCauHoi)
    {
      var khoCauHoi = await _khoCauHoiRepo.GetKhoCauHoiById(idKhoCauHoi);

      if (khoCauHoi == null) return new Response<List<CauHoi>>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy kho câu hỏi" }
      };

      var dsCauHoi = _cauHoiRepo.GetAll(idKhoCauHoi);

      return new Response<List<CauHoi>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCauHoi
      };
    }
  }
}