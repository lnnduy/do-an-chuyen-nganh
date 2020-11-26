using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<List<CauHoiResponse>>> GetDeThi(long idSinhVien, long id)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response<List<CauHoiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      var sinhVien = await _sinhVienRepo.GetSinhVienById(idSinhVien);

      if (sinhVien == null)
        return new Response<List<CauHoiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      var thiSinh = await _thiSinhRepo.GetThiSinhById(id, idSinhVien);

      if (thiSinh == null)
        return new Response<List<CauHoiResponse>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy thí sinh trong ca thi" }
        };

      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(caThi.IdDeThi);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var dsCauHoiResponse = new List<CauHoiResponse>();

      foreach (var cauHoi in dsCauHoi)
      {
        var dsDapAn = _dapAnRepo.GetAll(cauHoi.Id);
        var dsDapAnResponse = new List<DapAnResponse>();

        foreach (var dapAn in dsDapAn)
        {
          var dapAnResponse = new DapAnResponse(dapAn);
          dsDapAnResponse.Add(dapAnResponse);
        }

        dsCauHoiResponse.Add(new CauHoiResponse(cauHoi, dsDapAnResponse));
      }

      return new Response<List<CauHoiResponse>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCauHoiResponse
      };
    }
  }
}