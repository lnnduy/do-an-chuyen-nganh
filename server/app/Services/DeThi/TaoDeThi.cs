using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class DeThiService
  {
    public async Task<Response<DeThiResponse>> TaoDeThi(long idHocPhan, TaoDeThiRequest request)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<DeThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var deThi = new DeThi
      {
        TenDeThi = request.TenDeThi,
        DeThiThu = request.DeThiThu,
        SanSang = false,
        IdHocPhan = idHocPhan,
      };

      deThi.DsCauHoi = new List<ChiTietDeThi>();

      foreach (var idCauHoi in request.DsIdCauHoi)
        deThi.DsCauHoi.Add(new ChiTietDeThi { IdCauHoi = idCauHoi });

      var newDeThi = await _deThiRepo.CreateDeThi(deThi);
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var deThiResponse = new DeThiResponse(newDeThi, dsCauHoi);

      return new Response<DeThiResponse>
      {
        StatusCode = 201,
        Success = true,
        Data = deThiResponse
      };
    }
  }
}