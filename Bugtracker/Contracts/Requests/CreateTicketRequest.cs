﻿using Bugtracker.Domain;
using System;

namespace Bugtracker.Contracts.Requests
{
    public class CreateTicketRequest
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public Priority Priority { get; set; }

        public string AssigneeId { get; set; }

        public Guid ProjectId { get; set; }
    }
}
