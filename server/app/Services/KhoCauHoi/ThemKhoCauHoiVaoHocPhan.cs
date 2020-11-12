using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response<KhoCauHoi>> ThemKhoCauHoiVaoHocPhan(long idHocPhan, TaoKhoCauHoiRequest request)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null) return new Response<KhoCauHoi>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy học phần" }
      };

      var khoCauHoi = new KhoCauHoi
      {
        TenKhoCauHoi = request.TenKhoCauHoi,
        MoTa = request.MoTa,
        IdHocPhan = idHocPhan
      };

      var newKhoCauHoi = await _khoCauHoiRepo.CreateKhoCauHoi(khoCauHoi);

      return new Response<KhoCauHoi>
      {
        StatusCode = 201,
        Success = true,
        Data = newKhoCauHoi
      };
    }
  }
}