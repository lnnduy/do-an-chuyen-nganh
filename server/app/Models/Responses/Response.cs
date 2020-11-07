using System.Collections;

namespace Server.Model.Response
{
  public class Response<T>
  {
    public bool Success { get; set; }
    public IEnumerable Errors { get; set; }
    public int StatusCode { get; set; }
    public T Data { get; set; }

    public Response(T data)
    {
      Data = data;
    }

    public Response()
    { }
  }

  public class Response
  {
    public bool Success { get; set; }
    public IEnumerable Errors { get; set; }
    public int StatusCode { get; set; }
  }
}