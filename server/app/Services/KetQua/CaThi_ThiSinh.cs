using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;
using Server.Model.Response;

namespace Server.Service
{
  public partial class KetQuaService
  {
    public async Task<Response<KetQuaResponse>> CaThi_ThiSinh(long idCaThi, long idSinhVien)
    {
      var caThi = await _caThiRepo.GetCaThiById(idCaThi);

      if (caThi == null)
        return new Response<KetQuaResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      if (caThi.TrangThai != TrangThaiCaThi.DaKetThuc)
        return new Response<KetQuaResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Ca thi chưa kết thúc" }
        };

      var sinhVien = await _sinhVienRepo.GetSinhVienById(idSinhVien);

      if (sinhVien == null)
        return new Response<KetQuaResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      var thiSinh = await _thiSinhRepo.GetThiSinhById(idCaThi, idSinhVien);

      if (thiSinh == null)
        return new Response<KetQuaResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy thí sinh trong ca thi" }
        };

      var deThi = await _deThiRepo.GetDeThiById(caThi.IdDeThi);

      if (thiSinh == null)
        return new Response<KetQuaResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy đề thi" }
        };

      // var dsBaiLam = _baiLamRepo.GetAll(idCaThi, idSinhVien);
      // var hashBaiLam = new Dictionary<long, List<BaiLam>>();

      // foreach (var baiLam in dsBaiLam)
      // {
      //   if (hashBaiLam.ContainsKey(baiLam.IdCauHoi))
      //     hashBaiLam[baiLam.IdCauHoi].Add(baiLam);
      //   else {
      //     var listBaiLam = new List<BaiLam>();
      //     listBaiLam.Add(baiLam);
      //     hashBaiLam.Add(baiLam.IdCauHoi, listBaiLam);
      //   }
      // }

      var dsIdCauHoi = _deThiRepo.GetDsIdCauHoi(deThi.Id);
      var dsCauHoi = await _cauHoiRepo.GetMultipleCauHoiById(dsIdCauHoi);
      var dsKetQuaCauHoi = new List<KetQuaCauHoi>();

      foreach (var cauHoi in dsCauHoi)
      {
        var dsDapAn = _dapAnRepo.GetAll(cauHoi.Id);
        var dsKetQuaDapAn = new List<KetQuaDapAn>();
        var traLoiDung = true;

        foreach (var dapAn in dsDapAn)
        {
          var daChon = await _baiLamRepo.GetBaiLamById(idCaThi, idSinhVien, cauHoi.Id, dapAn.Id) != null;
          var ketQuaDapAn = new KetQuaDapAn
          {
            NoiDung = dapAn.NoiDung,
            DapAnDung = dapAn.DapAnDung,
            DapAnDaChon = daChon
          };
          traLoiDung = traLoiDung && (dapAn.DapAnDung == daChon);
          dsKetQuaDapAn.Add(ketQuaDapAn);
        }

        var ketQuaCauHoi = new KetQuaCauHoi(cauHoi, dsKetQuaDapAn);
        ketQuaCauHoi.TraLoiDung = traLoiDung;
        dsKetQuaCauHoi.Add(ketQuaCauHoi);
      }

      var ketQuaResponse = new KetQuaResponse(sinhVien, caThi, dsKetQuaCauHoi);

      return new Response<KetQuaResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = ketQuaResponse
      };
    }
  }
}