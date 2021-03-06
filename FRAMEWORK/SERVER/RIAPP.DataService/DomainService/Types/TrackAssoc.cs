﻿using System.Runtime.Serialization;

namespace RIAPP.DataService.DomainService.Types
{
    [DataContract]
    public class TrackAssoc
    {
        [DataMember]
        public string assocName { get; set; }

        [DataMember]
        public string parentKey { get; set; }

        [DataMember]
        public string childKey { get; set; }
    }
}