using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [ApiController]
  [Route("api/public-ca-thi/{idSinhVien}")]
  public class PublicCaThiController : ControllerBase
  {
    private readonly ICaThiService _caThiService;
    private readonly IBaiLamService _baiLamService;

    public PublicCaThiController(ICaThiService caThiService, IBaiLamService baiLamService)
    {
      _caThiService = caThiService;
      _baiLamService = baiLamService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsCaThiSanSang(long idSinhVien)
    {
      var serviceResult = await _caThiService.GetDsCaThiSanSang(idSinhVien);

      return Ok(serviceResult);
    }

    [HttpGet("de-thi/{idCaThi}")]
    public async Task<IActionResult> GetDeThi(long idSinhVien, long idCaThi)
    {
      var serviceResult = await _caThiService.GetDeThi(idSinhVien, idCaThi);

      return Ok(serviceResult);
    }

    [HttpGet("bai-lam/{idCaThi}/{idCauHoi}/{idDapAn}")]
    public async Task<IActionResult> ChonDapAn(long idCaThi, long idSinhVien, long idCauHoi, long idDapAn)
    {
      var serviceResult = await _baiLamService.CapNhatBaiLam(idCaThi, idSinhVien, idCauHoi, idDapAn);

      return Ok(serviceResult);
    }

    [HttpDelete("bai-lam/{idCaThi}/{idCauHoi}/{idDapAn}")]
    public async Task<IActionResult> BoChonDapAn(long idCaThi, long idSinhVien, long idCauHoi, long idDapAn)
    {
      var serviceResult = await _baiLamService.XoaBaiLam(idCaThi, idSinhVien, idCauHoi, idDapAn);

      return Ok(serviceResult);
    }

    [HttpPost("join/{idCaThi}")]
    public async Task<IActionResult> ThamGiaCaThi(long idSinhVien, long idCaThi, ThamGiaCaThiRequest request)
    {
      var serviceResult = await _caThiService.ThamGiaCaThi(idSinhVien, idCaThi, request);

      return Ok(serviceResult);
    }

    [HttpGet("{idCaThi}/nopBai")]
    public async Task<IActionResult> NopBai(long idSinhVien, long idCaThi)
    {
      var serviceResult = await _caThiService.NopBai(idSinhVien, idCaThi);

      return Ok(serviceResult);
    }
  }
}