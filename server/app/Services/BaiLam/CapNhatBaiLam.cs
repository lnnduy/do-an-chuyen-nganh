using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;
using Server.Model.Response;

namespace Server.Service
{
  public partial class BaiLamService
  {
    public async Task<Response> CapNhatBaiLam(long idCaThi, long idSinhVien, long idCauHoi, long idDapAn)
    {
      var caThi = await _caThiRepo.GetCaThiById(idCaThi);

      if (caThi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      if (caThi.TrangThai == TrangThaiCaThi.DaKetThuc)
        return new Response
        {
          StatusCode = 403,
          Success = false,
          Errors = new[] { "Ca thi đã kết thúc" }
        };

      var sinhVien = await _sinhVienRepo.GetSinhVienById(idSinhVien);

      if (sinhVien == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      var cauHoi = await _cauHoiRepo.GetCauHoiById(idCauHoi);

      if (cauHoi == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy câu hỏi" }
        };

      var dapAn = await _dapAnRepo.GetDapAnById(idDapAn);

      if (dapAn == null)
        return new Response
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy đáp án" }
        };

      if (cauHoi.NhieuDapAn)
      {
        var baiLam = new BaiLam
        {
          IdCaThi = idCaThi,
          IdSinhVien = idSinhVien,
          IdCauHoi = idCauHoi,
          IdDapAn = idDapAn
        };
        await _baiLamRepo.CreateBaiLam(baiLam);
      }
      else
      {
        var oldBaiLam = _baiLamRepo.GetBaiLamById(idCaThi, idSinhVien, idCauHoi);
        var baiLam = new BaiLam
        {
          IdCaThi = idCaThi,
          IdSinhVien = idSinhVien,
          IdCauHoi = idCauHoi,
          IdDapAn = idDapAn
        };
        if (oldBaiLam != null)
          await _baiLamRepo.DeleteBaiLam(oldBaiLam);
        await _baiLamRepo.CreateBaiLam(baiLam);
      }

      return new Response
      {
        StatusCode = 204,
        Success = true
      };
    }
  }
}