Rails.application.config.to_prepare do
  CamaleonCms::SiteHelper.module_eval do
    def cama_current_site_helper(args)
      if !args[:site].present? && request.present?
        args[:site] =
            case request.original_url.to_s.parse_domain
              when '128.199.142.231:3000'
                CamaleonCms::Site.find_by_slug('localhost:3000').decorate
              when 'yoursite.com'
                CamaleonCms::Site.find_by_slug('localhost:4000').decorate
            end
      end
    end
  end
end