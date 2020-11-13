using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CauHoiService
  {
    public async Task<Response> XoaCauHoi(long id)
    {
      var cauHoi = await _cauHoiRepo.GetCauHoiById(id);

      if (cauHoi == null) return new Response
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy câu hỏi" }
      };

      cauHoi.DsDapAn = _dapAnRepo.GetAll(cauHoi.Id);

      await _cauHoiRepo.DeleteCauHoi(cauHoi);

      return new Response
      {
        StatusCode = 204,
        Success = true,
      };
    }
  }
}