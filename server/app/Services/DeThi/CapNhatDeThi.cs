using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class DeThiService
  {
    public async Task<Response<DeThiResponse>> CapNhatDeThi(long id, CapNhatDeThiRequest request)
    {
      var deThi = await _deThiRepo.GetDeThiById(id);

      if (deThi == null)
        return new Response<DeThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy đề thi" }
        };

      deThi.TenDeThi = request.TenDeThi;
      deThi.SanSang = request.SanSang;

      deThi.DsCauHoi = new List<ChiTietDeThi>();

      foreach (var idCauHoi in request.DsIdCauHoi)
        deThi.DsCauHoi.Add(new ChiTietDeThi
        {
          IdDeThi = deThi.Id,
          IdCauHoi = idCauHoi
        });

      var updatedDeThi = await _deThiRepo.UpdateDethi(deThi);
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var deThiResponse = new DeThiResponse(updatedDeThi, dsCauHoi);

      return new Response<DeThiResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = deThiResponse
      };
    }
  }
}