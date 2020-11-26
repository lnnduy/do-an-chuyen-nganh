using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface ICaThiService
  {
    Task<Response<List<CaThiResponse>>> GetDsCaThi(long idHocPhan);
    Task<Response<CaThiResponse>> GetCaThi(long id);
    Task<Response<CaThiResponse>> TaoCaThi(long idHocPhan, TaoCaThiRequest request);
    Task<Response<CaThiResponse>> CapNhatCaThi(long id, TaoCaThiRequest request);
    Task<Response> XoaCaThi(long id);

    Response<List<CaThi>> GetDsCaThiDaNhan(long idTaiKhoan);
    Task<Response<CaThiResponse>> GetMaBaoVeCaThi(long id);
    Task<Response<CaThiResponse>> BatDauCaThi(long idTaiKhoan, long id, long ticks);
    Task<Response<CaThiResponse>> KetThucCaThi(long idTaiKhoan, long id);
    Task<Response<List<ThiSinhResponse>>> GetDsThiSinhDaThamGia(long id);

    Task<Response<List<CaThi>>> GetDsCaThiSanSang(long idSinhVien);
    Task<Response<List<CauHoiResponse>>> GetDeThi(long idSinhVien, long idCaThi);
    Task<Response<CaThi>> ThamGiaCaThi(long idSinhVien, long idCaThi, ThamGiaCaThiRequest request);
  }
}