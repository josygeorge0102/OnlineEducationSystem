using System;
using System.Collections.Generic;

namespace UserServiceAPI.Models
{
    public partial class ApiResourceScope
    {
        public int Id { get; set; }
        public string Scope { get; set; }
        public int ApiResourceId { get; set; }

        public virtual ApiResource ApiResource { get; set; }
    }
}
