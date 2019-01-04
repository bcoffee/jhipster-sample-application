package io.github.jhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Installation.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EnObject.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EnObject.class.getName() + ".objectAttributes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.EnObjectType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MessageType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MessageMap.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MessageMap.class.getName() + ".messageObjects", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Baseline.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Model.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ModelCode.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Attribute.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Attribute.class.getName() + ".objectOptions", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.AttributeOption.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Report.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ReportType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ReportCategory.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Notification.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Notification.class.getName() + ".notificationParameters", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.DistributionList.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.NotificationParameter.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ReportSubscription.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Note.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.NoteCategory.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Licence.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.UserOption.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
