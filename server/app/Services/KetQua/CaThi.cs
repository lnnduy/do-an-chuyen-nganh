using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Enum;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KetQuaService
  {
    public async Task<Response<KetQuaCaThiResponse>> CaThi(long idCaThi)
    {
      var caThi = await _caThiRepo.GetCaThiById(idCaThi);

      if (caThi == null)
        return new Response<KetQuaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      if (caThi.TrangThai != TrangThaiCaThi.DaKetThuc)
        return new Response<KetQuaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Ca thi chưa kết thúc" }
        };

      var deThi = await _deThiRepo.GetDeThiById(caThi.IdDeThi);

      if (deThi == null)
        return new Response<KetQuaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy đề thi" }
        };

      var dsSinhVien = _sinhVienRepo.GetAllInLopHoc(caThi.IdLopHoc);
      var dsKetQuaCaNhanResponse = new List<KetQuaCaNhanResponse>();
      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);

      foreach (var sinhVien in dsSinhVien)
      {
        var ketQuaCaNhanResponse = new KetQuaCaNhanResponse
        {
          MSSV = sinhVien.MSSV,
          HoTen = sinhVien.HoTen,
          SoCauTraLoiDung = 0
        };
        var soCauTraLoiDung = 0;

        foreach (var cauHoi in dsCauHoi)
        {
          var dsDapAn = _dapAnRepo.GetAll(cauHoi.Id);
          var dsKetQuaDapAn = new List<KetQuaDapAn>();
          var traLoiDung = true;

          foreach (var dapAn in dsDapAn)
          {
            var daChon = await _baiLamRepo.GetBaiLamById(idCaThi, sinhVien.Id, cauHoi.Id, dapAn.Id) != null;
            traLoiDung = traLoiDung && (dapAn.DapAnDung == daChon);
          }

          soCauTraLoiDung += traLoiDung ? 1 : 0;
        }

        ketQuaCaNhanResponse.SoCauTraLoiDung = soCauTraLoiDung;

        dsKetQuaCaNhanResponse.Add(ketQuaCaNhanResponse);
      }

      var ketQuaCaThiResponse = new KetQuaCaThiResponse
      {
        TenDeThi = deThi.TenDeThi,
        SoCauHoi = dsCauHoi.Count,
        DsKetQuaCaNhan = dsKetQuaCaNhanResponse
      };

      return new Response<KetQuaCaThiResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = ketQuaCaThiResponse
      };
    }
  }
}