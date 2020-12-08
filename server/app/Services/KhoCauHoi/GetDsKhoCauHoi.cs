using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response<List<KhoCauHoiResponse>>> GetDsKhoCauHoi(long idHocPhan)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<List<KhoCauHoiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var dsKhoCauHoi = _khoCauHoiRepo.GetAll(idHocPhan);
      var dsKhoCauHoiResponse = new List<KhoCauHoiResponse>();

      foreach (var khoCauHoi in dsKhoCauHoi)
      {
        khoCauHoi.DsCauHoi = _cauHoiRepo.GetAll(khoCauHoi.Id);
        var khoCauHoiResponse = new KhoCauHoiResponse(khoCauHoi);
        dsKhoCauHoiResponse.Add(khoCauHoiResponse);
      }

      return new Response<List<KhoCauHoiResponse>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsKhoCauHoiResponse
      };
    }
  }
}