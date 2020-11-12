using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KhoCauHoiService
  {
    public async Task<Response<List<KhoCauHoi>>> GetDsKhoCauHoi(long idHocPhan)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<List<KhoCauHoi>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var dsKhoCauHoi = _khoCauHoiRepo.GetAll(idHocPhan);

      return new Response<List<KhoCauHoi>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsKhoCauHoi
      };
    }
  }
}