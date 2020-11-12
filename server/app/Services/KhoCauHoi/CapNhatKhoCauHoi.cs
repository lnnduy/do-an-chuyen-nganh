using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response<KhoCauHoi>> CapNhatKhoCauHoi(long id, TaoKhoCauHoiRequest request)
    {
      var khoCauHoi = await _khoCauHoiRepo.GetKhoCauHoiById(id);

      if (khoCauHoi == null)
        return new Response<KhoCauHoi>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy kho câu hỏi" }
        };

      khoCauHoi.TenKhoCauHoi = request.TenKhoCauHoi;
      khoCauHoi.MoTa = request.MoTa;

      var updatedKhoCauHoi = await _khoCauHoiRepo.UpdateKhoCauHoi(khoCauHoi);

      return new Response<KhoCauHoi>
      {
        StatusCode = 200,
        Success = true,
        Data = updatedKhoCauHoi
      };
    }
  }
}