using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response> XoaKhoCauHoi(long id)
    {
      var khoCauHoi = await _khoCauHoiRepo.GetKhoCauHoiById(id);

      if (khoCauHoi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy kho câu hỏi" }
        };

      await _khoCauHoiRepo.DeleteKhoCauHoi(khoCauHoi);

      return new Response
      {
        StatusCode = 204,
        Success = true,
      };
    }
  }
}