using System;
using System.Collections.Generic;

namespace UserServiceAPI.Models
{
    public partial class ApiScopeProperty
    {
        public int Id { get; set; }
        public int ScopeId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public virtual ApiScope Scope { get; set; }
    }
}
