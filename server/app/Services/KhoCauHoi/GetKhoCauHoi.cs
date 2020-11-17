using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response<KhoCauHoi>> GetKhoCauHoi(long id)
    {
      var khoCauHoi = await _khoCauHoiRepo.GetKhoCauHoiById(id);

      if (khoCauHoi == null)
        return new Response<KhoCauHoi>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy kho câu hỏi" }
        };

      return new Response<KhoCauHoi>
      {
        StatusCode = 200,
        Success = true,
        Data = khoCauHoi
      };
    }
  }
}