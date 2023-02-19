﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureWebPubSub.Services.Models
{
    public record Message 
    {
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Content { get; set; }
        public MessageEvent Event { get; set; }
        public Guid? TenantId { get; set; }
        public Guid? UserId { get; set; }
 
    }
}
