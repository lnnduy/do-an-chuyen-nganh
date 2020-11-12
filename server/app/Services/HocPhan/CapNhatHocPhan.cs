using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class HocPhanService
  {
    public async Task<Response<HocPhan>> CapNhatHocPhan(long id, TaoHocPhanRequest request)
    {
      var existsHocPhan = await _hocPhanRepo.GetHocPhanById(id);

      if (existsHocPhan == null)
        return new Response<HocPhan>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      existsHocPhan.TenHocPhan = request.TenHocPhan;
      var updatedHocPhan = await _hocPhanRepo.UpdateHocPhan(existsHocPhan);

      return new Response<HocPhan>
      {
        StatusCode = 200,
        Success = true,
        Errors = null,
        Data = updatedHocPhan
      };
    }
  }
}