function FirstTimeSetup({ onComplete }) {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <h1 className="mb-3">Birthday Briefing</h1>
            <p className="text-muted">
              Your data stays on your device. No tracking.
            </p>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="carddavUrl" className="form-label">
                    CardDAV URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="carddavUrl"
                    placeholder="https://example.com/contacts/user/addressbook"
                    defaultValue=""
                  />
                  <div className="form-text">
                    Enter the URL to your CardDAV address book containing birthdays
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">First day of week</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="firstDayOfWeek"
                        id="monday"
                        value="monday"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="monday">
                        Monday
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="firstDayOfWeek"
                        id="sunday"
                        value="sunday"
                      />
                      <label className="form-check-label" htmlFor="sunday">
                        Sunday
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="button" className="btn btn-primary btn-lg" onClick={onComplete}>
                    Get Started
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-3">
            <small className="text-muted">
              Open source • MIT License
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstTimeSetup;

