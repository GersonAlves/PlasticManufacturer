using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class SecondLabelsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/SecondLabels
        public IQueryable<SecondLabel> GetSecondLabels()
        {
            return db.SecondLabels;
        }

        // GET: api/SecondLabels/5
        [ResponseType(typeof(SecondLabel))]
        public async Task<IHttpActionResult> GetSecondLabel(int id)
        {
            SecondLabel secondLabel = await db.SecondLabels.FindAsync(id);
            if (secondLabel == null)
            {
                return NotFound();
            }

            return Ok(secondLabel);
        }

        // PUT: api/SecondLabels/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSecondLabel(int id, SecondLabel secondLabel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != secondLabel.Id)
            {
                return BadRequest();
            }

            db.Entry(secondLabel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SecondLabelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SecondLabels
        [ResponseType(typeof(SecondLabel))]
        public async Task<IHttpActionResult> PostSecondLabel(SecondLabel secondLabel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SecondLabels.Add(secondLabel);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = secondLabel.Id }, secondLabel);
        }

        // DELETE: api/SecondLabels/5
        [ResponseType(typeof(SecondLabel))]
        public async Task<IHttpActionResult> DeleteSecondLabel(int id)
        {
            SecondLabel secondLabel = await db.SecondLabels.FindAsync(id);
            if (secondLabel == null)
            {
                return NotFound();
            }

            db.SecondLabels.Remove(secondLabel);
            await db.SaveChangesAsync();

            return Ok(secondLabel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SecondLabelExists(int id)
        {
            return db.SecondLabels.Count(e => e.Id == id) > 0;
        }
    }
}