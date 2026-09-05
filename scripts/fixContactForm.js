import fs from 'fs';

const file = 'd:/JDC solar/frontend/contact/index.html';
let content = fs.readFileSync(file, 'utf8');

const rightCol = `          <!-- Right Column: Accessible Consultation & Site Survey Form -->
          <div class="card--glass" style="padding: var(--space-2xl);" data-reveal="zoom">
            <span class="badge badge--primary badge--pulse" style="margin-bottom: 0.5rem;">FREE ROOFTOP SURVEY</span>
            <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Book an On-Site Rooftop Inspection</h2>
            <p class="text-small text-muted" style="margin-bottom: 1.5rem;">
              Fill out the details below. Our technical team in Adityapur will inspect your roof topography, conduct a 3D shadow analysis, and prepare an exact proposal.
            </p>

            <!-- Accessible Success Banner (hidden by default) -->
            <div class="form-success-banner hidden" style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; margin-bottom: 1.5rem;">
              <svg class="icon" style="width: 48px; height: 48px; color: #15803D; margin-bottom: 0.75rem;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
              <h3 style="color: #15803D; margin-bottom: 0.5rem;">Thank You! Your Request Has Been Received.</h3>
              <p class="text-small" style="color: #166534; line-height: 1.5;">Our engineering team will connect via WhatsApp and call you within 2 business hours.</p>
            </div>

            <!-- Contact Form -->
            <form data-validate="true" action="#" method="POST" novalidate>
              
              <!-- Anti-Spam Honeypot -->
              <input type="text" name="b_url" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">

              <div class="form-group">
                <label class="form-label" for="contact-name">Full Name <span class="required-mark">*</span></label>
                <input type="text" id="contact-name" name="name" class="form-control" placeholder="e.g. Rajesh Sharma" autocomplete="name" required>
                <span id="contact-name-error" class="form-error-msg hidden">Please enter your full name.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-phone">Mobile Phone (10 Digits) <span class="required-mark">*</span></label>
                <input type="tel" id="contact-phone" name="phone" class="form-control" placeholder="e.g. 9876543210" autocomplete="tel" required>
                <span id="contact-phone-error" class="form-error-msg hidden">Please enter a valid 10-digit Indian phone number.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-service">Solar Installation Type <span class="required-mark">*</span></label>
                <select id="contact-service" name="service" class="form-select" required>
                  <option value="Residential Rooftop Solar" selected>Residential Rooftop Solar</option>
                  <option value="Commercial & Industrial Solar">Commercial & Industrial Solar</option>
                  <option value="Institutional Solar (Hospital/School)">Institutional Solar (Hospital/School)</option>
                  <option value="Government & Tender EPC">Government & Tender EPC</option>
                  <option value="Solar Street Lighting">Solar Street Lighting</option>
                  <option value="Utility Solar Parks">Utility Solar Parks</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-city">City / Pincode in Jharkhand <span class="required-mark">*</span></label>
                <input type="text" id="contact-city" name="city" class="form-control" placeholder="e.g. Jamshedpur, 831001" autocomplete="address-level2" required>
                <span id="contact-city-error" class="form-error-msg hidden">Please enter your city or pincode.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">Project Details / Roof Area <span class="text-muted">(Optional)</span></label>
                <textarea id="contact-message" name="message" class="form-control" rows="3" placeholder="e.g. Looking for a 5 kW rooftop system for my home in Morabadi, Ranchi." maxlength="500"></textarea>
              </div>

              <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
                By submitting this form, you agree to our <a href="/privacy-policy/" style="color: var(--color-brand-primary); text-decoration: underline;">Privacy Policy</a>. We never share your contact details.
              </div>

              <button type="submit" class="btn btn--primary btn--block btn--lg">
                Book Free Consultation & Site Survey →
              </button>
            </form>

          </div>`;

const pattern = /<\/div>\s*<\/div>\s*<\/div>\s*[\s\S]*?<!-- Section 3: Regional Coverage Area -->/;
const replacement = `</div>\n            </div>\n          </div>\n\n${rightCol}\n\n        </div>\n      </div>\n    </section>\n\n    <!-- Section 3: Regional Coverage Area -->`;

content = content.replace(pattern, replacement);
fs.writeFileSync(file, content, 'utf8');
console.log('✅ Successfully updated contact form in contact/index.html');
