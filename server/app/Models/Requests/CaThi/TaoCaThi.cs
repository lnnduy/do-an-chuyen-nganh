namespace Server.Model.Request
{
  public class TaoCaThiRequest
  {
    public string TenCaThi { get; set; }
    public long ThoiGianBatDau { get; set; }
    public long ThoiGianThi { get; set; }
    public long IdHocPhan { get; set; }
    public long IdLopHoc { get; set; }
    public long IdGiamThi { get; set; }
    public long IdDeThi { get; set; }
  }
}